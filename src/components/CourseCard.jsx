import { useState, useEffect } from "react";
import { Clock, BookOpen, Star, Bookmark, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const CourseCard = ({ course }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("user-bookmarks") || "[]");
    setIsBookmarked(savedBookmarks.includes(course.id));

    const savedProgress = localStorage.getItem(`progress-${course.id}`);
    setIsEnrolled(savedProgress !== null);
  }, [course.id]);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const savedBookmarks = JSON.parse(localStorage.getItem("user-bookmarks") || "[]");
    let updated;

    if (savedBookmarks.includes(course.id)) {
      updated = savedBookmarks.filter((id) => id !== course.id);
      setIsBookmarked(false);
    } else {
      updated = [...savedBookmarks, course.id];
      setIsBookmarked(true);
    }
    localStorage.setItem("user-bookmarks", JSON.stringify(updated));
  };

  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : null;

  return (
    <Link to={`/course/${course.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col h-full relative">
        {/* Thumbnail & Badges */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <Badge className="bg-card/95 text-foreground backdrop-blur-md border-0 text-xs font-semibold px-2.5 py-1 shadow-sm">
              {course.category}
            </Badge>

            <button
              onClick={toggleBookmark}
              className={`h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                isBookmarked
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
              title={isBookmarked ? "Remove bookmark" : "Bookmark course"}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Level & Discount Badges */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-md">
              {course.level}
            </span>
            {discountPercent && (
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-emerald-500 text-white shadow-sm">
                Save {discountPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            {/* Rating & Review Count */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
              <div className="flex items-center text-amber-500 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-500 mr-1" />
                <span>{course.rating.toFixed(1)}</span>
              </div>
              <span>({course.reviewCount.toLocaleString()} reviews)</span>
              {isEnrolled && (
                <span className="ml-auto text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Enrolled
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-card-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-snug">
              {course.title}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div>
            {/* Instructor */}
            <div className="flex items-center gap-2 mb-4 pt-3 border-t border-border/50">
              <img src={course.instructorAvatar} alt={course.instructor} className="h-6 w-6 rounded-full object-cover ring-1 ring-primary/20" />
              <span className="text-xs font-medium text-muted-foreground truncate">{course.instructor}</span>
            </div>

            {/* Pricing & Duration */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-primary">₹{course.price.toLocaleString("en-IN")}</span>
                {course.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">₹{course.originalPrice.toLocaleString("en-IN")}</span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-primary/80" />
                  <span>{course.totalLessons}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-primary/80" />
                  <span>{course.totalDuration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
