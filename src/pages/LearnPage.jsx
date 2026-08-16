import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "@/data/courses";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import QuizModal from "@/components/QuizModal";
import CertificateModal from "@/components/CertificateModal";
import {
  PlayCircle,
  CheckCircle2,
  BookOpen,
  Award,
  ArrowLeft,
  ChevronRight,
  HelpCircle,
  FileText,
  Save,
  Sparkles,
  Lock
} from "lucide-react";
import { toast } from "sonner";

export const LearnPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === courseId);

  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [isCertOpen, setIsCertOpen] = useState(false);

  useEffect(() => {
    if (course) {
      const first = course.sections[0]?.lessons[0];
      if (first) setActiveLesson(first);

      const saved = localStorage.getItem(`progress-${course.id}`);
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    }
  }, [course]);

  useEffect(() => {
    if (course && activeLesson) {
      const savedNote = localStorage.getItem(`note-${course.id}-${activeLesson.id}`);
      setNoteText(savedNote || "");
    }
  }, [course, activeLesson]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate("/courses")} className="gradient-primary text-primary-foreground">
            Explore Courses
          </Button>
        </div>
      </div>
    );
  }

  const allLessons = course.sections.flatMap((s) => s.lessons);
  const progressPercent = allLessons.length > 0 ? Math.round((completedLessons.length / allLessons.length) * 100) : 0;
  const isCourseComplete = progressPercent === 100;

  const toggleLessonComplete = (lessonId) => {
    let updated;
    if (completedLessons.includes(lessonId)) {
      updated = completedLessons.filter((id) => id !== lessonId);
      toast.info("Marked lesson as uncompleted");
    } else {
      updated = [...completedLessons, lessonId];
      toast.success("Lesson completed! Keep up the momentum 🔥");
    }
    setCompletedLessons(updated);
    localStorage.setItem(`progress-${course.id}`, JSON.stringify(updated));
  };

  const handleSaveNote = () => {
    if (activeLesson) {
      localStorage.setItem(`note-${course.id}-${activeLesson.id}`, noteText);
      toast.success("Lesson note saved!");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Top Header Bar */}
      <div className="bg-muted/40 border-b py-3 px-4">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/course/${course.id}`)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-semibold"
            >
              <ArrowLeft className="h-4 w-4" /> Exit Studio
            </button>
            <span className="text-muted-foreground">|</span>
            <h1 className="text-sm font-extrabold truncate max-w-md">{course.title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground font-semibold">Progress:</span>
              <Progress value={progressPercent} className="w-28 h-2" />
              <span className="font-bold text-primary">{progressPercent}%</span>
            </div>

            {isCourseComplete && (
              <Button
                size="sm"
                onClick={() => setIsCertOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs gap-1.5 shadow-md"
              >
                <Award className="h-4 w-4" /> Claim Certificate
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Studio View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Video Player & Notes Studio */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {activeLesson ? (
            <div className="space-y-4">
              {/* YouTube Embed Player */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border">
                <iframe
                  src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=1`}
                  title={activeLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>

              {/* Lesson Controls Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-card border shadow-sm">
                <div>
                  <Badge className="mb-1 text-[10px] bg-primary/10 text-primary border-0 font-semibold">
                    Lesson {activeLesson.order}
                  </Badge>
                  <h2 className="text-lg font-bold">{activeLesson.title}</h2>
                  <p className="text-xs text-muted-foreground">{activeLesson.duration} · Instructor: {course.instructor}</p>
                </div>

                <Button
                  onClick={() => toggleLessonComplete(activeLesson.id)}
                  variant={completedLessons.includes(activeLesson.id) ? "outline" : "default"}
                  className={`text-xs font-bold gap-2 ${
                    completedLessons.includes(activeLesson.id)
                      ? "text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      : "gradient-primary text-primary-foreground"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {completedLessons.includes(activeLesson.id) ? "Completed ✓" : "Mark as Complete"}
                </Button>
              </div>

              {/* Notes Taking Tab */}
              <div className="p-4 rounded-2xl bg-card border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                    <FileText className="h-4 w-4 text-primary" /> Personal Lesson Notes
                  </span>
                  <Button size="sm" onClick={handleSaveNote} variant="ghost" className="h-7 text-xs gap-1 text-primary">
                    <Save className="h-3.5 w-3.5" /> Save Note
                  </Button>
                </div>

                <Textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Take notes while watching this lesson..."
                  rows={3}
                  className="text-xs resize-none bg-muted/40"
                />
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground">Select a lesson from the sidebar to start watching.</div>
          )}
        </div>

        {/* Right Sidebar Syllabus & Quizzes */}
        <div className="w-full lg:w-96 border-l bg-card/60 p-4 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-extrabold text-sm flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" /> Course Content
            </h3>
            <span className="text-xs text-muted-foreground font-semibold">
              {completedLessons.length}/{allLessons.length} Done
            </span>
          </div>

          <div className="space-y-4">
            {course.sections.map((section) => (
              <div key={section.id} className="space-y-2 border rounded-xl p-3 bg-card">
                <div className="flex items-center justify-between text-xs font-bold text-foreground">
                  <span>{section.title}</span>
                </div>

                <div className="space-y-1 pt-1">
                  {section.lessons.map((lesson) => {
                    const isActive = activeLesson?.id === lesson.id;
                    const isDone = completedLessons.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                          isActive
                            ? "bg-primary/15 text-primary font-bold"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          ) : (
                            <PlayCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0">{lesson.duration}</span>
                      </div>
                    );
                  })}

                  {section.quiz && (
                    <button
                      onClick={() => setActiveQuiz({ title: section.title, questions: section.quiz })}
                      className="w-full mt-2 flex items-center justify-between p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 text-[11px] font-bold"
                    >
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="h-3.5 w-3.5 text-amber-500" /> Take Section Quiz
                      </span>
                      <Badge className="bg-amber-500 text-white text-[9px] border-0">
                        {section.quiz.length} Qs
                      </Badge>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {activeQuiz && (
        <QuizModal
          isOpen={activeQuiz !== null}
          onClose={() => setActiveQuiz(null)}
          title={activeQuiz.title}
          questions={activeQuiz.questions}
        />
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        course={course}
      />
    </div>
  );
};

export default LearnPage;
