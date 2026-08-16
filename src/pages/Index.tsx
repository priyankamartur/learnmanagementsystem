import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import { courses, categories } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Brain,
  Smartphone,
  ShieldAlert,
  Cloud,
  Palette,
  Gamepad2,
  Database,
  Cpu,
  Terminal,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Users,
  CheckCircle2
} from "lucide-react";

export const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Icon mapping for categories
  const categoryIcons: Record<string, any> = {
    "Web Development": Code,
    "Data Science & AI": Brain,
    "Mobile Development": Smartphone,
    "Cybersecurity": ShieldAlert,
    "Cloud & DevOps": Cloud,
    "UI/UX Design": Palette,
    "Game Development": Gamepad2,
    "Database Engineering": Database,
    "System Design": Cpu,
    "Programming Languages": Terminal,
  };

  // Top featured masterclasses for the frontpage hero grid
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Frontpage Hero Section */}
      <HeroSection />

      {/* Domain Category Grid */}
      <section className="container mx-auto px-4 py-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge className="mb-2 bg-primary/10 text-primary border-0 font-semibold text-xs">
              10+ Technical Domains
            </Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Explore Categories</h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Choose from over 50+ specialized engineering & tech tracks
            </p>
          </div>

          <Button
            onClick={() => navigate("/courses")}
            className="gradient-primary text-primary-foreground font-semibold text-xs gap-1.5 self-start md:self-auto"
          >
            View All 50+ Courses <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.filter((cat) => cat !== "All").map((cat) => {
            const Icon = categoryIcons[cat] || Code;
            const count = courses.filter((c) => c.category === cat).length;

            return (
              <div
                key={cat}
                onClick={() => navigate(`/courses?category=${encodeURIComponent(cat)}`)}
                className="group p-4 rounded-2xl border bg-card hover:bg-muted/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center space-y-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xs font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {cat}
                </h3>
                <span className="text-[10px] text-muted-foreground font-medium">
                  {count} {count === 1 ? "Course" : "Courses"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Masterclasses */}
      <section className="bg-muted/30 border-y py-12">
        <div className="container mx-auto px-4 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 font-semibold text-xs">
                  Hand-Picked Top Courses
                </Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Featured Masterclasses</h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Highest-rated tracks taught by top tech lead instructors
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate("/courses")}
              className="text-xs font-semibold gap-1.5"
            >
              Browse Full Catalog <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features & Learning Guarantee */}
      <section className="container mx-auto px-4 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 text-xs font-semibold">
            Why LearnHub Academy?
          </Badge>
          <h2 className="text-3xl font-extrabold">Everything You Need to Succeed</h2>
          <p className="text-sm text-muted-foreground">
            Built for developers, engineers, and lifelong learners seeking high-impact technical mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border bg-card shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">50+ Specialized Courses</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Curated technical courses across Full-Stack Web, AI, Cybersecurity, System Design, and Mobile Development.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">Verified Certificates</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Earn shareable completion certificates with unique verification IDs upon completing 100% of course lessons.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">Interactive Learning Studio</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Watch HD video lessons, take notes, attempt section quizzes, and track your streak in your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Callout */}
      <section className="bg-gradient-to-r from-navy via-navy/95 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <Badge className="bg-primary/30 text-emerald-300 border-0 text-xs">Start Today</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready to Elevate Your Developer Career?</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Join thousands of developers, data scientists, designers, and engineers learning on LearnHub today.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/courses")}
            className="gradient-primary text-primary-foreground font-bold text-base shadow-xl gap-2"
          >
            Explore Courses Collection <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card mt-auto">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground space-y-1">
          <p>© 2026 LearnHub Academy. Empowering 12,000+ developers worldwide.</p>
          <p className="text-[11px] text-primary font-medium">
            Engineered by Priyanka Martur with Google DeepMind Antigravity Agentic AI 🚀
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
