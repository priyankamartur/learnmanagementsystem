import { useState } from "react";
import { Search, Sparkles, BookOpen, Users, Award, PlayCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-12 pb-16 md:pt-20 md:pb-24 border-b">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Top Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary border border-primary/20 text-xs font-bold shadow-sm animate-pulse">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>50+ Expert-Led Technical Masterclasses Available</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Master In-Demand Skills. <br />
            <span className="bg-gradient-to-r from-primary via-accent to-emerald-500 bg-clip-text text-transparent">
              Build Your Tech Career.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Learn Full-Stack Web Development, Data Science & AI, Cybersecurity, Cloud Engineering, and System Design with hands-on video studio lessons and verified certificates.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center gap-2 p-2 rounded-2xl bg-card border shadow-xl">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search React, Python ML, AWS, Cybersecurity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 bg-transparent focus-visible:ring-0 text-sm h-11"
              />
            </div>
            <Button type="submit" className="gradient-primary text-primary-foreground font-bold h-11 px-6 text-xs gap-1.5 shrink-0 rounded-xl">
              Search Courses <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Quick Popular Topic Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
            <span className="font-semibold text-foreground">Popular:</span>
            {["React & Next.js", "Python ML", "Ethical Hacking", "Flutter", "System Design"].map((topic) => (
              <button
                key={topic}
                onClick={() => navigate(`/courses?q=${encodeURIComponent(topic)}`)}
                className="px-3 py-1 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors border text-[11px] font-medium"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Platform Stats Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-border/60">
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-foreground">50+</p>
              <p className="text-[11px] text-muted-foreground font-semibold flex items-center justify-center gap-1">
                <BookOpen className="h-3 w-3 text-primary" /> Active Courses
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-foreground">12,000+</p>
              <p className="text-[11px] text-muted-foreground font-semibold flex items-center justify-center gap-1">
                <Users className="h-3 w-3 text-emerald-500" /> Students Enrolled
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-foreground">100%</p>
              <p className="text-[11px] text-muted-foreground font-semibold flex items-center justify-center gap-1">
                <PlayCircle className="h-3 w-3 text-amber-500" /> Self-Paced HD
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-foreground">4.9 ★</p>
              <p className="text-[11px] text-muted-foreground font-semibold flex items-center justify-center gap-1">
                <Award className="h-3 w-3 text-amber-500" /> Average Rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
