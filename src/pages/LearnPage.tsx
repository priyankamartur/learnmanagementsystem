import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, ChevronLeft, ChevronRight, CheckCircle2, Circle, PlayCircle } from "lucide-react";
import type { Lesson } from "@/data/courses";

const LearnPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === courseId);

  const allLessons: Lesson[] = course?.sections.flatMap((s) => s.lessons) ?? [];

  const [currentLessonId, setCurrentLessonId] = useState<string>(allLessons[0]?.id ?? "");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(`progress-${courseId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

  const currentLesson = allLessons.find((l) => l.id === currentLessonId);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);
  const progress = allLessons.length > 0 ? (completedLessons.size / allLessons.length) * 100 : 0;

  useEffect(() => {
    localStorage.setItem(`progress-${courseId}`, JSON.stringify([...completedLessons]));
  }, [completedLessons, courseId]);

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Course not found.</p>
      </div>
    );
  }

  const toggleComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  };

  const markAndNext = () => {
    setCompletedLessons((prev) => new Set(prev).add(currentLessonId));
    if (currentIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentIndex + 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-card/90 backdrop-blur-md px-4 h-14">
        <div className="flex items-center gap-3">
          <Link to={`/course/${courseId}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md gradient-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold hidden sm:block">{course.title}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{Math.round(progress)}% complete</span>
          <Progress value={progress} className="w-32 h-2" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="w-full bg-foreground/5">
            <div className="aspect-video max-h-[70vh] w-full">
              <iframe
                src={`https://www.youtube.com/embed/${currentLesson.youtubeId}?rel=0`}
                title={currentLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">{currentLesson.title}</h2>
            <p className="text-sm text-muted-foreground mb-6">Lesson {currentLesson.order} of {allLessons.length} · {currentLesson.duration}</p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={markAndNext} className="gradient-primary border-0 text-primary-foreground font-semibold gap-2">
                {currentIndex < allLessons.length - 1 ? (
                  <>Mark Complete & Next <ChevronRight className="h-4 w-4" /></>
                ) : (
                  <>Mark Complete <CheckCircle2 className="h-4 w-4" /></>
                )}
              </Button>
              {currentIndex > 0 && (
                <Button variant="outline" onClick={() => setCurrentLessonId(allLessons[currentIndex - 1].id)}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
              )}
            </div>
          </div>
        </main>

        {/* Sidebar lesson list */}
        <aside className="hidden md:flex w-80 lg:w-96 flex-col border-l bg-card overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="text-sm font-bold">Course Content</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {course.sections.map((section) => (
              <div key={section.id}>
                <div className="px-4 py-3 bg-muted/50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{section.title}</h4>
                </div>
                <ul>
                  {section.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;
                    const isDone = completedLessons.has(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => setCurrentLessonId(lesson.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors text-sm ${
                            isActive ? "bg-primary/10 border-l-2 border-primary" : "hover:bg-muted/50"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          ) : isActive ? (
                            <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                          ) : (
                            <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium truncate ${isActive ? "text-primary" : "text-foreground"}`}>{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
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
      </div>
    </div>
  );
};

export default LearnPage;
