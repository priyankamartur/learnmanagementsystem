import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { courses, categories } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, BookOpen, Sparkles, ArrowLeft } from "lucide-react";

const COURSES_PER_PAGE = 12;

export const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get("category") || "All");
  const [selectedLevel, setSelectedLevel] = useState(() => searchParams.get("level") || "All");
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState(() => searchParams.get("sort") || "popular");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("q");
    if (cat) setSelectedCategory(cat);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchCat = selectedCategory === "All" || c.category === selectedCategory;
      const matchLevel = selectedLevel === "All" || c.level === selectedLevel;
      const matchQuery =
        searchQuery.trim() === "" ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchLevel && matchQuery;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return b.reviewCount - a.reviewCount;
    });
  }, [selectedCategory, selectedLevel, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * COURSES_PER_PAGE;
    return filteredCourses.slice(start, start + COURSES_PER_PAGE);
  }, [filteredCourses, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    setSearchParams({ category: cat, level: selectedLevel, q: searchQuery, sort: sortBy });
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSearchQuery("");
    setSortBy("popular");
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/15 via-accent/10 to-background border-b py-10">
        <div className="container mx-auto px-4 space-y-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-semibold mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-primary/20 text-primary border-0 text-xs font-semibold">
                  50+ Courses Library
                </Badge>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">Explore Technical Courses</h1>
              <p className="text-xs text-muted-foreground">
                Browse our complete catalog of self-paced courses, projects, and certifications
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative max-w-sm w-full">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search courses, skills, instructors..."
                className="pl-9 text-xs h-10 bg-card"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 space-y-8 flex-1">
        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : "bg-card border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border bg-card text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 font-bold text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Filter Level:
            </div>
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => {
                  setSelectedLevel(level);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  selectedLevel === level
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-background border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High (₹)</option>
              <option value="price-desc">Price: High to Low (₹)</option>
            </select>

            {(selectedCategory !== "All" || selectedLevel !== "All" || searchQuery) && (
              <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-xs text-rose-500">
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <p>
            Showing <strong className="text-foreground">{filteredCourses.length}</strong> courses
          </p>
          <p>Page {currentPage} of {totalPages || 1}</p>
        </div>

        {/* Course Grid */}
        {paginatedCourses.length === 0 ? (
          <div className="p-12 text-center border border-dashed rounded-2xl bg-card space-y-3">
            <BookOpen className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-bold">No courses found</h3>
            <p className="text-xs text-muted-foreground">Try clearing search terms or selecting a different category filter.</p>
            <Button onClick={handleResetFilters} variant="outline" size="sm" className="mt-2 text-xs font-semibold">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="text-xs font-semibold"
            >
              Previous
            </Button>

            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={currentPage === idx + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(idx + 1)}
                className={`text-xs font-bold ${currentPage === idx + 1 ? "gradient-primary text-primary-foreground" : ""}`}
              >
                {idx + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="text-xs font-semibold"
            >
              Next
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-12 bg-card">
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

export default CoursesPage;
