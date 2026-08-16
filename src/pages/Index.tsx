import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  Video,
  BookOpenCheck,
  Award,
  Zap,
  Star,
  Code2,
  BrainCircuit,
  Smartphone,
  ShieldCheck,
  Cloud,
  Palette,
  Gamepad2,
  Database,
  Cpu,
  Terminal
} from "lucide-react";

export const Index = () => {
  const navigate = useNavigate();

  // Get top 4 featured or popular courses for the homepage
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 4);

  const domainCategories = [
    { name: "Web Development", icon: Code2, count: "8 Courses", color: "bg-blue-500/10 text-blue-500" },
    { name: "Data Science & AI", icon: BrainCircuit, count: "6 Courses", color: "bg-emerald-500/10 text-emerald-500" },
    { name: "Mobile Development", icon: Smartphone, count: "5 Courses", color: "bg-purple-500/10 text-purple-500" },
    { name: "Cybersecurity", icon: ShieldCheck, count: "4 Courses", color: "bg-red-500/10 text-red-500" },
    { name: "Cloud & DevOps", icon: Cloud, count: "5 Courses", color: "bg-cyan-500/10 text-cyan-500" },
    { name: "UI/UX Design", icon: Palette, count: "4 Courses", color: "bg-amber-500/10 text-amber-500" },
    { name: "Game Development", icon: Gamepad2, count: "4 Courses", color: "bg-pink-500/10 text-pink-500" },
    { name: "Database Engineering", icon: Database, count: "4 Courses", color: "bg-indigo-500/10 text-indigo-500" },
    { name: "System Design", icon: Cpu, count: "3 Courses", color: "bg-orange-500/10 text-orange-500" },
    { name: "Programming Languages", icon: Terminal, count: "4 Courses", color: "bg-teal-500/10 text-teal-500" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <HeroSection onSearchSubmit={(term) => navigate(`/courses?q=${encodeURIComponent(term)}`)} />

      {/* Domain Categories Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="bg-primary/20 text-primary border-0 mb-2 font-semibold">Explore Categories</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Top Learning Domains</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Click any domain to explore specialized courses and skill paths
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {domainCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(`/courses?category=${encodeURIComponent(cat.name)}`)}
                className="p-5 rounded-2xl border bg-card hover:bg-muted/60 transition-all text-left flex flex-col justify-between group shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.count}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Courses Preview (Only Top 4) */}
      <section className="bg-muted/30 border-y py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Top Pick Courses</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Featured Masterclasses</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Hand-picked high-demand courses rated 4.8+ by 12,000+ students
              </p>
            </div>

            <Button
              onClick={() => navigate("/courses")}
              className="gradient-primary text-primary-foreground font-bold text-sm gap-2 self-start md:self-auto shadow-md"
            >
              View Full 50+ Courses Catalog <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/courses")}
              className="font-bold text-sm gap-2 border-primary/30 text-primary hover:bg-primary/10"
            >
              Click Here to See All Courses ({courses.length}+ Total) <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 mb-3 font-semibold">Why LearnHub?</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Designed for Career Acceleration
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Everything you need to master high-demand technical skills and build real portfolio projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg">50+ Video Courses</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Curated curriculum covering Web, AI, Security, Mobile, Cloud & DevOps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <BookOpenCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg">Interactive Quizzes</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Test your knowledge after section completion with score checks and explanations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg">Official Certificates</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Receive verifiable credentials when you complete 100% of a course curriculum.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg">Lifetime Access</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Learn at your own pace with unlimited lifetime access to all future course updates.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Callout */}
      <section className="bg-gradient-to-r from-navy via-slate-900 to-navy text-white py-16 border-t">
        <div className="container mx-auto px-4 text-center max-w-2xl space-y-6">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-0 uppercase tracking-widest text-[10px]">Start Learning</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready to Boost Your Technical Skills?</h2>
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
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          © 2026 LearnHub Academy. Empowering 12,000+ developers worldwide.
        </div>
      </footer>
    </div>
  );
};

export default Index;
