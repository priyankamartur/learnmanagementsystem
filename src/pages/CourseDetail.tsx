import { useParams, useNavigate } from "react-router-dom";
import { courses } from "@/data/courses";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, CheckCircle2, User, ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero */}
      <div className="gradient-navy">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-navy-foreground/60 hover:text-navy-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </button>
          <Badge className="mb-4 bg-primary/20 text-primary border-0">{course.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy-foreground mb-4">{course.title}</h1>
          <p className="text-navy-foreground/70 max-w-2xl mb-6">{course.longDescription}</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-navy-foreground/60">
            <div className="flex items-center gap-2">
              <img src={course.instructorAvatar} alt={course.instructor} className="h-8 w-8 rounded-full" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> {course.totalLessons} lessons
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {course.totalDuration}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-primary-foreground">${course.price}</span>
              {course.originalPrice && (
                <span className="text-lg text-navy-foreground/50 line-through">${course.originalPrice}</span>
              )}
            </div>
            <Button
              size="lg"
              className="gradient-primary border-0 text-primary-foreground font-semibold"
              onClick={() => navigate(`/learn/${course.id}`)}
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        {/* Left: Curriculum */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
          <Accordion type="multiple" defaultValue={course.sections.map((s) => s.id)} className="space-y-3">
            {course.sections.map((section) => (
              <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-4">
                <AccordionTrigger className="text-base font-semibold hover:no-underline">
                  {section.title}
                  <span className="ml-auto mr-3 text-xs font-normal text-muted-foreground">{section.lessons.length} lessons</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-2">
                    {section.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex items-center justify-between rounded-md p-2.5 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                            {lesson.order}
                          </span>
                          <span className="text-sm font-medium">{lesson.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Right: What you'll learn */}
        <div>
          <div className="sticky top-24 rounded-xl border bg-card p-6">
            <h3 className="text-lg font-bold mb-4">What you'll learn</h3>
            <ul className="space-y-3">
              {course.learningPoints.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-card-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
