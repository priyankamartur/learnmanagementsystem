import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { courses } from "@/data/courses";
import type { Course } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import CertificateModal from "@/components/CertificateModal";
import CertificatePanel from "@/components/CertificatePanel";
import ProfileModal from "@/components/ProfileModal";
import {
  BookOpen,
  Award,
  Flame,
  Clock,
  PlayCircle,
  Bookmark,
  CheckCircle2,
  FileText,
  ArrowRight,
  TrendingUp,
  Edit,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<{ course: Course; progress: number }[]>([]);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<Course[]>([]);
  const [selectedCertCourse, setSelectedCertCourse] = useState<Course | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [savedNotes, setSavedNotes] = useState<{ courseId: string; lessonId: string; note: string }[]>([]);

  // Active tab state in dashboard: "courses" | "certificates" | "bookmarks" | "notes"
  const [activeTab, setActiveTab] = useState<"courses" | "certificates" | "bookmarks" | "notes">("courses");

  // User Profile State
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("user-profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Alex Morgan",
          email: "alex.morgan@example.com",
          role: "Software Developer & Lifelong Learner",
          bio: "Passionate about full-stack web development, AI engineering, and building user-centric applications.",
          targetSkills: "React, Next.js, Python, AWS, System Design",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
        };
  });

  useEffect(() => {
    // Collect enrolled progress
    const enrolled: { course: Course; progress: number }[] = [];
    courses.forEach((c) => {
      const saved = localStorage.getItem(`progress-${c.id}`);
      if (saved) {
        const completedSet: string[] = JSON.parse(saved);
        const allLessons = c.sections.flatMap((s) => s.lessons);
        const pct = allLessons.length > 0 ? (completedSet.length / allLessons.length) * 100 : 0;
        enrolled.push({ course: c, progress: Math.min(100, Math.round(pct)) });
      }
    });

    if (enrolled.length === 0) {
      const default1 = courses[0]; // React course
      const default2 = courses[1]; // Python ML

      const allLessons1 = default1.sections.flatMap((s) => s.lessons).map((l) => l.id);
      localStorage.setItem(`progress-${default1.id}`, JSON.stringify(allLessons1));
      enrolled.push({ course: default1, progress: 100 });

      localStorage.setItem(`progress-${default2.id}`, JSON.stringify([default2.sections[0].lessons[0].id]));
      enrolled.push({ course: default2, progress: 35 });
    }

    setEnrolledCourses(enrolled);

    // Bookmarks
    const bookmarkedIds: string[] = JSON.parse(localStorage.getItem("user-bookmarks") || "[]");
    setBookmarkedCourses(courses.filter((c) => bookmarkedIds.includes(c.id)));

    // Saved Notes
    const notesArr: { courseId: string; lessonId: string; note: string }[] = [];
    courses.forEach((c) => {
      c.sections.flatMap((s) => s.lessons).forEach((l) => {
        const noteText = localStorage.getItem(`note-${c.id}-${l.id}`);
        if (noteText && noteText.trim() !== "") {
          notesArr.push({ courseId: c.id, lessonId: l.id, note: noteText });
        }
      });
    });
    setSavedNotes(notesArr);
  }, []);

  const completedCertificates = enrolledCourses.filter((item) => item.progress === 100);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-primary/15 via-accent/10 to-background border-b py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-20 w-20 rounded-full object-cover ring-4 ring-primary/30 shadow-lg shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{profile.name}</h1>
                  <Badge className="bg-primary/20 text-primary border-0 text-xs">{profile.role}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
                <p className="text-xs text-foreground/80 max-w-lg line-clamp-2">{profile.bio}</p>

                {profile.targetSkills && (
                  <div className="flex items-center gap-1.5 pt-1 text-[11px]">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    <span className="font-semibold text-muted-foreground">Target Skills:</span>
                    <span className="text-primary font-medium">{profile.targetSkills}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setIsProfileModalOpen(true)}
                className="gap-1.5 text-xs font-semibold"
              >
                <Edit className="h-4 w-4 text-primary" /> Edit Profile
              </Button>

              <Button
                onClick={() => navigate("/courses")}
                className="gradient-primary text-primary-foreground font-semibold text-xs gap-1.5"
              >
                Browse 50+ Courses <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 space-y-10 flex-1">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            onClick={() => setActiveTab("courses")}
            className={`p-5 rounded-2xl border bg-card shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
              activeTab === "courses" ? "ring-2 ring-primary" : "hover:border-primary/50"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{enrolledCourses.length}</p>
              <p className="text-xs text-muted-foreground font-medium">Enrolled Courses</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border bg-card shadow-sm flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Flame className="h-6 w-6 fill-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">5 Days</p>
              <p className="text-xs text-muted-foreground font-medium">Active Learning Streak 🔥</p>
            </div>
          </div>

          <div
            onClick={() => setActiveTab("certificates")}
            className={`p-5 rounded-2xl border bg-card shadow-sm flex items-center gap-4 cursor-pointer transition-all ${
              activeTab === "certificates" ? "ring-2 ring-amber-500" : "hover:border-amber-500/50"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{completedCertificates.length}</p>
              <p className="text-xs text-muted-foreground font-medium">Certificates Earned</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border bg-card shadow-sm flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">18.5 Hours</p>
              <p className="text-xs text-muted-foreground font-medium">Total Watch Time</p>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b overflow-x-auto scrollbar-none gap-8">
          {[
            { id: "courses", label: `My Courses (${enrolledCourses.length})`, icon: BookOpen },
            { id: "certificates", label: `My Certificates (${completedCertificates.length})`, icon: Award },
            { id: "bookmarks", label: `Wishlist (${bookmarkedCourses.length})`, icon: Bookmark },
            { id: "notes", label: `Saved Notes (${savedNotes.length})`, icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ENROLLED COURSES */}
        {activeTab === "courses" && (
          <section className="space-y-6">
            {enrolledCourses.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed text-center bg-card">
                <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
                <Button onClick={() => navigate("/courses")} className="gradient-primary text-primary-foreground">
                  Explore 50+ Courses
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map(({ course, progress }) => (
                  <div key={course.id} className="p-6 rounded-2xl border bg-card shadow-sm flex flex-col justify-between space-y-4">
                    <div className="flex gap-4">
                      <img src={course.thumbnail} alt={course.title} className="h-20 w-28 object-cover rounded-xl shrink-0" />
                      <div className="min-w-0 flex-1">
                        <Badge className="mb-1 text-[10px] bg-secondary text-secondary-foreground border-0">{course.category}</Badge>
                        <h3 className="font-bold text-base line-clamp-1">{course.title}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-primary" /> {course.totalDuration} · {course.instructor}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="text-primary">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {progress === 100 ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCertCourse(course);
                            setIsCertModalOpen(true);
                          }}
                          className="text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/10 font-semibold gap-1.5 text-xs"
                        >
                          <Award className="h-4 w-4 text-amber-500" /> View Certificate
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">Continue learning</span>
                      )}

                      <Button
                        size="sm"
                        onClick={() => navigate(`/learn/${course.id}`)}
                        className="gradient-primary text-primary-foreground font-semibold text-xs gap-1 ml-auto"
                      >
                        Resume Learning <PlayCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 2: MY CERTIFICATES PANEL */}
        {activeTab === "certificates" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" /> Earned Certificates Hub
                </h2>
                <p className="text-xs text-muted-foreground">
                  Official verifiable completion credentials for finished courses
                </p>
              </div>
            </div>

            {completedCertificates.length === 0 ? (
              <div className="p-10 rounded-2xl border border-dashed text-center bg-card space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 mb-2">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-base">No Certificates Claimed Yet</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Complete 100% of any course lessons to automatically earn a shareable & printable Certificate of Completion.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {completedCertificates.map(({ course }) => (
                  <CertificatePanel
                    key={course.id}
                    course={course}
                    onOpenFullModal={() => {
                      setSelectedCertCourse(course);
                      setIsCertModalOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 3: BOOKMARKS */}
        {activeTab === "bookmarks" && (
          <section className="space-y-4">
            {bookmarkedCourses.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed text-center bg-card text-xs text-muted-foreground">
                No bookmarked courses yet. Click the bookmark icon on any course card to save it here!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarkedCourses.map((c) => (
                  <Link
                    key={c.id}
                    to={`/course/${c.id}`}
                    className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.thumbnail} alt={c.title} className="h-12 w-16 object-cover rounded-lg" />
                      <div>
                        <p className="text-sm font-semibold text-foreground line-clamp-1">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.category} · ₹{c.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 4: SAVED NOTES */}
        {activeTab === "notes" && (
          <section className="space-y-4">
            {savedNotes.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed text-center bg-card text-xs text-muted-foreground">
                No personal notes saved yet. Use the Notes panel while watching any video lesson to take notes!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedNotes.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border bg-card space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-primary">
                      <span>Course Highlight</span>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => navigate(`/learn/${item.courseId}`)}
                        className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Go to lesson →
                      </Button>
                    </div>
                    <p className="text-xs text-foreground bg-muted/60 p-3 rounded-lg leading-relaxed">
                      "{item.note}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Certificate Modal */}
      {selectedCertCourse && (
        <CertificateModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          course={selectedCertCourse}
        />
      )}

      {/* Edit Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onProfileUpdated={(updated) => setProfile(updated)}
      />

      {/* Footer */}
      <footer className="border-t py-8 mt-12 bg-card">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          © 2026 LearnHub Academy. Empowering lifelong learners worldwide.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
