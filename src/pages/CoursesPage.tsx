import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { courses, categories } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  SlidersHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from "lucide-react";

const COURSES_PER_PAGE = 12;

export const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "price-asc" | "price-desc">("popular");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Filtering logic
  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;
    const matchesQuery =
      searchQuery.trim() === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLevel && matchesQuery;
  });

  // Sorting logic
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return b.reviewCount - a.reviewCount;
  });

  // Pagination calculation
  const totalPages = Math.ceil(sortedCourses.length / COURSES_PER_PAGE);
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const paginatedCourses = sortedCourses.slice(startIndex, startIndex + COURSES_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSearchParams(cat === "All" ? {} : { category: cat });
    setCurrentPage(1);
  };

  const handleLevelChange = (lvl: string) => {
    setSelectedLevel(lvl);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy via-navy/90 to-slate-900 text-white border-b py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/30 text-emerald-300 border-0 font-semibold">Course Collection</Badge>
              <span className="text-xs text-slate-300">{courses.length}+ Courses Available</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Browse All Courses</h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Explore our full library of expert-led video courses across Web Dev, AI, Cloud, Cybersecurity, Mobile & Design.
            </p>

            {/* Quick Search Bar */}
            <div className="flex items-center gap-2 pt-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by course title, skill, or instructor..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-slate-400 text-sm focus-visible:ring-emerald-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <section className="container mx-auto px-4 py-12 flex-1 space-y-8">
        {/* Category Pills & Sorting Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-card border shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-end lg:self-auto">
            {/* Level Selector */}
            <div className="flex items-center gap-1 rounded-xl bg-muted/60 p-1">
              {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleLevelChange(lvl)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedLevel === lvl
                      ? "bg-card text-foreground shadow-sm font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lvl === "All" ? "All" : lvl}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="text-xs font-semibold bg-muted/60 border border-border/60 rounded-xl px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {sortedCourses.length === 0 ? (
          <div className="p-12 text-center border border-dashed rounded-2xl bg-card space-y-4">
            <h3 className="text-lg font-bold">No courses match your search criteria</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your category, level, or search query.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedLevel("All");
                setSearchQuery("");
                setSearchParams({});
                setCurrentPage(1);
              }}
              className="gradient-primary text-primary-foreground font-semibold"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between border-t pt-6 gap-4">
                <p className="text-xs text-muted-foreground">
                  Showing <span className="font-bold text-foreground">{startIndex + 1}</span> to{" "}
                  <span className="font-bold text-foreground">
                    {Math.min(startIndex + COURSES_PER_PAGE, sortedCourses.length)}
                  </span>{" "}
                  of <span className="font-bold text-foreground">{sortedCourses.length}</span> courses
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="gap-1 text-xs font-semibold"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
                            currentPage === pageNum
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="gap-1 text-xs font-semibold"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          © 2026 LearnHub Academy. Comprehensive Courses Collection.
        </div>
      </footer>
    </div>
  );
};

export default CoursesPage;
