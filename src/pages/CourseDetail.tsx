import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "@/data/courses";
import type { QuizQuestion } from "@/data/courses";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PaymentModal from "@/components/PaymentModal";
import QuizModal from "@/components/QuizModal";
import {
  Clock,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  Star,
  Bookmark,
  PlayCircle,
  ShieldCheck,
  UserCheck,
  CreditCard,
  HelpCircle
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === courseId);

  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "instructor" | "reviews" | "faq">("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Quiz Modal State
  const [activeQuiz, setActiveQuiz] = useState<{ title: string; questions: QuizQuestion[] } | null>(null);

  useEffect(() => {
    if (course) {
      const savedBookmarks: string[] = JSON.parse(localStorage.getItem("user-bookmarks") || "[]");
      setIsBookmarked(savedBookmarks.includes(course.id));
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button onClick={() => navigate("/courses")} className="gradient-primary text-primary-foreground">
            Back to Courses Collection
          </Button>
        </div>
      </div>
    );
  }

  const toggleBookmark = () => {
    const savedBookmarks: string[] = JSON.parse(localStorage.getItem("user-bookmarks") || "[]");
    let updated: string[];
    if (savedBookmarks.includes(course.id)) {
      updated = savedBookmarks.filter((id) => id !== course.id);
      setIsBookmarked(false);
      toast.info("Removed from bookmarked courses");
    } else {
      updated = [...savedBookmarks, course.id];
      setIsBookmarked(true);
      toast.success("Saved to bookmarked courses!");
    }
    localStorage.setItem("user-bookmarks", JSON.stringify(updated));
  };

  const firstLesson = course.sections[0]?.lessons[0];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-navy via-navy/90 to-slate-900 text-white border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </button>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/30 text-emerald-300 border-0">{course.category}</Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">{course.level}</Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">{course.title}</h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">{course.description}</p>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({course.reviewCount.toLocaleString()} ratings)</span>
                </div>

                <div className="flex items-center gap-2">
                  <img src={course.instructorAvatar} alt={course.instructor} className="h-6 w-6 rounded-full object-cover" />
                  <span>Created by <strong className="text-white">{course.instructor}</strong></span>
                </div>

                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-emerald-400" /> {course.totalLessons} lessons
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-emerald-400" /> {course.totalDuration}
                </div>
              </div>
            </div>

            {/* Right Pricing Card */}
            <div className="p-6 rounded-2xl bg-card text-card-foreground border shadow-2xl space-y-5">
              <div className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
                <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <PlayCircle className="h-6 w-6 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-black/70 text-white px-2 py-0.5 rounded">
                  Preview Video
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary">₹{course.price.toLocaleString("en-IN")}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">₹{course.originalPrice.toLocaleString("en-IN")}</span>
                  )}
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Lifetime Access
                </span>
              </div>

              <div className="space-y-3 pt-1">
                <Button
                  size="lg"
                  onClick={() => setIsPaymentOpen(true)}
                  className="w-full gradient-primary border-0 text-primary-foreground font-bold text-base shadow-lg hover:brightness-110 gap-2"
                >
                  <CreditCard className="h-5 w-5" /> Enroll & Pay ₹{course.price.toLocaleString("en-IN")}
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={toggleBookmark}
                  className="w-full gap-2 border-border"
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
                  {isBookmarked ? "Saved to Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              <div className="space-y-2 border-t pt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Interactive Section Quizzes Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-10 flex-1">
        {/* Navigation Tabs Bar */}
        <div className="flex border-b mb-8 overflow-x-auto scrollbar-none gap-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "curriculum", label: "Curriculum & Quizzes" },
            { id: "instructor", label: "Instructor" },
            { id: "reviews", label: "Reviews" },
            { id: "faq", label: "FAQs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl space-y-10">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Learning Points */}
              <div className="p-6 rounded-2xl border bg-card space-y-4">
                <h3 className="text-xl font-bold text-foreground">What you'll learn</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.learningPoints.map((point, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                      <span className="text-card-foreground leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Course Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {course.longDescription}
                </p>
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Requirements & Prerequisites</h3>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                  {course.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM & QUIZZES */}
          {activeTab === "curriculum" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Course Content & Practice Quizzes</h3>
                  <p className="text-xs text-muted-foreground">
                    {course.sections.length} sections · {course.totalLessons} lessons · {course.totalDuration} total length
                  </p>
                </div>
              </div>

              <Accordion type="multiple" defaultValue={course.sections.map((s) => s.id)} className="space-y-3">
                {course.sections.map((section) => (
                  <AccordionItem key={section.id} value={section.id} className="border rounded-2xl px-5 bg-card">
                    <AccordionTrigger className="text-base font-semibold hover:no-underline py-4">
                      <span>{section.title}</span>
                      <span className="ml-auto mr-3 text-xs font-normal text-muted-foreground">
                        {section.lessons.length} lessons
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pb-3 border-t pt-3">
                        {section.lessons.map((lesson) => (
                          <li
                            key={lesson.id}
                            className="flex items-center justify-between rounded-xl p-3 hover:bg-muted transition-colors text-sm"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle className="h-4 w-4 text-primary shrink-0" />
                              <span className="font-medium text-foreground">{lesson.title}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </li>
                        ))}

                        {/* Quiz Trigger in Section */}
                        {section.quiz && (
                          <li className="pt-2">
                            <button
                              onClick={() => setActiveQuiz({ title: section.title, questions: section.quiz! })}
                              className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors text-xs font-bold"
                            >
                              <span className="flex items-center gap-2">
                                <HelpCircle className="h-4 w-4 text-amber-500" />
                                Take Section Quiz: {section.title}
                              </span>
                              <Badge className="bg-amber-500 text-white text-[10px] border-0">
                                {section.quiz.length} Questions
                              </Badge>
                            </button>
                          </li>
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* TAB 3: INSTRUCTOR */}
          {activeTab === "instructor" && (
            <div className="p-6 rounded-2xl border bg-card space-y-4">
              <div className="flex items-center gap-4">
                <img src={course.instructorAvatar} alt={course.instructor} className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20" />
                <div>
                  <h3 className="text-lg font-bold">{course.instructor}</h3>
                  <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {course.instructor} is an industry expert with over 10 years of engineering and instruction experience.
              </p>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-card border">
                <div className="text-center shrink-0 pr-6 border-r">
                  <p className="text-4xl font-extrabold text-primary">{course.rating.toFixed(1)}</p>
                  <div className="flex items-center justify-center text-amber-500 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Course Rating</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Student Feedback</h4>
                  <p className="text-xs text-muted-foreground">Based on {course.reviewCount} student ratings</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === "faq" && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="f1" className="border rounded-xl px-4 bg-card">
                  <AccordionTrigger className="text-sm font-semibold">How long do I have access to this course?</AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">
                    You get lifetime access! Watch at your own pace whenever you want on any desktop or mobile device.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="f2" className="border rounded-xl px-4 bg-card">
                  <AccordionTrigger className="text-sm font-semibold">Will I receive a certificate of completion?</AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">
                    Yes! Once you complete 100% of the course lessons, an official Certificate of Completion will be generated automatically for you to print or download.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
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

      {/* Payment Checkout Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        course={course}
        onPaymentSuccess={() => navigate(`/learn/${course.id}`)}
      />

      {/* Video Preview Modal */}
      {firstLesson && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card">
            <DialogHeader className="p-4 border-b">
              <DialogTitle className="text-base font-bold">Course Preview: {firstLesson.title}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${firstLesson.youtubeId}?autoplay=1`}
                title={firstLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CourseDetail;
