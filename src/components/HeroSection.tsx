import heroBanner from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBanner} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/80" />
      </div>
      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full gradient-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground mb-6">
            🚀 Start Learning Today
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy-foreground leading-tight mb-5">
            Master New Skills with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Expert-Led
            </span>{" "}
            Courses
          </h1>
          <p className="text-lg text-navy-foreground/70 mb-8 max-w-lg">
            Access curated video courses from top instructors. Track your progress and learn at your own pace.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="gradient-primary border-0 text-primary-foreground font-semibold gap-2">
              Browse Courses <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-navy-foreground/20 text-navy-foreground hover:bg-navy-foreground/10 gap-2">
              <PlayCircle className="h-4 w-4" /> Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
