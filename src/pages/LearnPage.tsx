import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { courses } from "@/data/courses";
import type { Lesson, Section, QuizQuestion } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import CertificateModal from "@/components/CertificateModal";
import QuizModal from "@/components/QuizModal";
import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  Award,
  FileText,
  HelpCircle,
  Menu,
  X,
  Sparkles,
  Save
} from "lucide-react";
import { toast } from "sonner";

export const LearnPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === courseId);

  const allLessons: Lesson[] = course?.sections.flatMap((s) => s.lessons) ?? [];

  const [currentLessonId, setCurrentLessonId] = useState<string>(allLessons[0]?.id ?? "");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(`progress-${courseId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Certificate Modal state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Quiz Modal state
  const [activeQuizSection, setActiveQuizSection] = useState<{ title: string; questions: QuizQuestion[] } | null>(null);

  const currentLesson = allLessons.find((l) => l.id === currentLessonId);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);
  const currentSection = course?.sections.find((s) => s.lessons.some((l) => l.id === currentLessonId));
  const progress = allLessons.length > 0 ? (completedLessons.size / allLessons.length) * 100 : 0;

  // Sync completed lessons to localStorage
  useEffect(() => {
    localStorage.setItem(`progress-${courseId}`, JSON.stringify([...completedLessons]));
  }, [completedLessons, courseId]);

  // Sync lesson notes to localStorage
  useEffect(() => {
    if (courseId && currentLessonId) {
      const savedNote = localStorage.getItem(`note-${courseId}-${currentLessonId}`);
      setNotes(savedNote || "");
    }
  }, [courseId, currentLessonId]);

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center space-y-4">
        <p className="text-muted-foreground">Course content not found.</p>
        <Button onClick={() => navigate("/")} className="gradient-primary text-primary-foreground">
          Back to Home
        </Button>
      </div>
    );
  }

  const saveCurrentNote = () => {
    localStorage.setItem(`note-${courseId}-${currentLessonId}`, notes);
    toast.success("Lesson note saved!");
  };

  const toggleComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
        toast.success("Lesson marked complete!");
      }
      return next;
    });
  };

  const markAndNext = () => {
    setCompletedLessons((prev) => new Set(prev).add(currentLessonId));
    toast.success("Lesson completed!");

    if (currentIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentIndex + 1].id);
    } else {
      toast.success("🎉 Congratulations! You have completed the entire course!");
      setIsCertModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-card/95 backdrop-blur-md px-4 h-14 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to={`/course/${courseId}`}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-semibold"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Course Details
          </Link>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold truncate max-w-xs hidden md:block">{course.title}</span>
          </div>
        </div>

        {/* Progress & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {progress === 100 && (
            <Button
              size="sm"
              onClick={() => setIsCertModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs gap-1.5 animate-pulse shadow-md"
            >
              <Award className="h-4 w-4" /> Claim Certificate
            </Button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">{Math.round(progress)}%</span>
            <Progress value={progress} className="w-24 sm:w-32 h-2" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground"
            title="Toggle Curriculum Sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Main Learning Workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area: Video Player & Lesson Details */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-background">
          {/* Video Player Container */}
          <div className="w-full bg-slate-950 flex justify-center">
            <div className="aspect-video max-h-[68vh] w-full max-w-5xl">
              <iframe
                src={`https://www.youtube.com/embed/${currentLesson.youtubeId}?autoplay=1&rel=0`}
                title={currentLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>

          {/* Lesson Metadata & Control Bar */}
          <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-1">
                  <span>{currentSection?.title}</span>
                  <span>·</span>
                  <span>Lesson {currentLesson.order} of {allLessons.length}</span>
                </div>
                <h1 className="text-2xl font-extrabold text-foreground">{currentLesson.title}</h1>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNotes((prev) => !prev)}
                  className={`gap-1.5 text-xs font-semibold ${showNotes ? "border-primary text-primary" : ""}`}
                >
                  <FileText className="h-4 w-4" />
                  {showNotes ? "Hide Notes" : "Take Notes"}
                </Button>

                {currentSection?.quiz && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveQuizSection({ title: currentSection.title, questions: currentSection.quiz! })}
                    className="gap-1.5 text-xs font-semibold text-amber-600 border-amber-500/30 hover:bg-amber-500/10"
                  >
                    <HelpCircle className="h-4 w-4 text-amber-500" /> Section Quiz
                  </Button>
                )}
              </div>
            </div>

            {/* Notes Notepad (Collapsible) */}
            {showNotes && (
              <div className="p-4 rounded-2xl border bg-card space-y-3 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-primary" /> Personal Notes for "{currentLesson.title}"
                  </span>
                  <Button size="sm" onClick={saveCurrentNote} className="gap-1 text-xs gradient-primary text-primary-foreground">
                    <Save className="h-3.5 w-3.5" /> Save Note
                  </Button>
                </div>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type key concepts, ideas, or code snippets here... (Auto-saved locally)"
                  className="min-h-[120px] text-xs font-mono bg-muted/50 border-border"
                />
              </div>
            )}

            {/* Navigation & Completion Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                {currentIndex > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentLessonId(allLessons[currentIndex - 1].id)}
                    className="gap-1 text-xs font-semibold"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous Lesson
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => toggleComplete(currentLessonId)}
                  className={`gap-1.5 text-xs font-semibold ${
                    completedLessons.has(currentLessonId) ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : ""
                  }`}
                >
                  <CheckCircle2 className={`h-4 w-4 ${completedLessons.has(currentLessonId) ? "text-emerald-500" : ""}`} />
                  {completedLessons.has(currentLessonId) ? "Completed" : "Mark as Done"}
                </Button>

                <Button
                  onClick={markAndNext}
                  className="gradient-primary border-0 text-primary-foreground font-bold text-xs gap-1.5 shadow-md"
                >
                  {currentIndex < allLessons.length - 1 ? (
                    <>Next Lesson <ChevronRight className="h-4 w-4" /></>
                  ) : (
                    <>Finish Course & Claim Certificate <Sparkles className="h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Curriculum Drawer */}
        {sidebarOpen && (
          <aside className="w-80 lg:w-96 flex flex-col border-l bg-card shrink-0 overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between bg-muted/30">
              <h3 className="text-sm font-extrabold text-foreground">Course Content</h3>
              <span className="text-xs text-muted-foreground">
                {completedLessons.size} / {allLessons.length} Done
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y">
              {course.sections.map((section) => (
                <div key={section.id}>
                  <div className="px-4 py-3 bg-muted/40 flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground truncate">
                      {section.title}
                    </h4>
                    {section.quiz && (
                      <button
                        onClick={() => setActiveQuizSection({ title: section.title, questions: section.quiz! })}
                        className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline shrink-0"
                      >
                        Take Quiz
                      </button>
                    )}
                  </div>

                  <ul>
                    {section.lessons.map((lesson) => {
                      const isActive = lesson.id === currentLessonId;
                      const isDone = completedLessons.has(lesson.id);

                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() => setCurrentLessonId(lesson.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors text-xs ${
                              isActive
                                ? "bg-primary/10 border-l-4 border-primary text-primary font-bold"
                                : "hover:bg-muted/50 text-foreground"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                            ) : isActive ? (
                              <PlayCircle className="h-4 w-4 shrink-0 text-primary animate-pulse" />
                            ) : (
                              <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="truncate">{lesson.title}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{lesson.duration}</p>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        course={course}
      />

      {/* Quiz Modal */}
      {activeQuizSection && (
        <QuizModal
          isOpen={activeQuizSection !== null}
          onClose={() => setActiveQuizSection(null)}
          title={activeQuizSection.title}
          questions={activeQuizSection.questions}
        />
      )}
    </div>
  );
};

export default LearnPage;
