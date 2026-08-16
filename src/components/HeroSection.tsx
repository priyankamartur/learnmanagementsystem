import { useState } from "react";
import heroBanner from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, PlayCircle, Search, Users, Award, Star, BookCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onSearchSubmit?: (term: string) => void;
}

export const HeroSection = ({ onSearchSubmit }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchTerm);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroBanner} alt="Hero Banner" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/85 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full gradient-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground mb-6 shadow-lg shadow-primary/20">
            🚀 The #1 Rated Learning Platform 2026
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Master High-Demand Skills with{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Expert-Led
            </span>{" "}
            Video Courses
          </h1>

          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
            Gain job-ready technical skills in Web Development, Data Science, UI/UX, Cloud, and AI. Track your progress with interactive quizzes and earn certificates.
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl max-w-xl mb-10">
            <Search className="h-5 w-5 text-slate-300 ml-3 shrink-0" />
            <Input
              type="text"
              placeholder="What do you want to learn today? (e.g. React, Python, Figma)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 bg-transparent text-white placeholder:text-slate-300 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" size="default" className="gradient-primary text-primary-foreground font-semibold shrink-0 shadow-md">
              Search
            </Button>
          </form>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-white leading-none">12,500+</p>
                <p className="text-xs text-slate-300">Active Students</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                <BookCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-white leading-none">98.4%</p>
                <p className="text-xs text-slate-300">Completion Rate</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                <Star className="h-5 w-5 fill-amber-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white leading-none">4.9 / 5.0</p>
                <p className="text-xs text-slate-300">Course Rating</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-white leading-none">100%</p>
                <p className="text-xs text-slate-300">Verified Badges</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
