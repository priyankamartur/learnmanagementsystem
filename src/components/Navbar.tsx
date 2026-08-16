import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Search, BookOpen, LayoutDashboard, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import AuthModal from "@/components/AuthModal";
import ProfileModal from "@/components/ProfileModal";
import { courses } from "@/data/courses";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem("user-profile");
    return saved ? JSON.parse(saved) : null;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchDialogOpen(false);
      navigate(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const searchResults = searchQuery.trim()
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-foreground flex items-center gap-1">
              LearnHub <span className="text-primary text-xs font-bold px-1.5 py-0.5 rounded bg-primary/10">PRO</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-medium -mt-1">Academy & Skills Platform</span>
          </div>
        </Link>

        {/* Central Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/courses" className="hover:text-primary transition-colors flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-primary" /> 50+ Courses
          </Link>
          <Link to="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4 text-amber-500" /> My Dashboard
          </Link>
        </nav>

        {/* Right Utility Tools */}
        <div className="flex items-center gap-3">
          {/* Quick Search Dialog Trigger */}
          <button
            onClick={() => setIsSearchDialogOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-muted/50 hover:bg-muted text-xs text-muted-foreground transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">Search 50+ courses...</span>
            <kbd className="hidden sm:inline text-[10px] font-mono bg-card px-1.5 py-0.5 rounded border">⌘K</kbd>
          </button>

          {/* Light / Dark Mode Switcher */}
          <ThemeToggle />

          {/* User Profile or Register Trigger */}
          {userProfile ? (
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition-colors ring-2 ring-primary/20"
              title="Edit Student Profile"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="h-8 w-8 rounded-full object-cover shrink-0"
              />
            </button>
          ) : (
            <Button
              size="sm"
              onClick={() => setIsAuthOpen(true)}
              className="gradient-primary text-primary-foreground font-semibold text-xs gap-1.5"
            >
              <LogIn className="h-4 w-4" /> Sign In
            </Button>
          )}
        </div>
      </div>

      {/* Quick Search Modal */}
      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="max-w-xl p-4 bg-card">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border-b pb-3">
            <Search className="h-5 w-5 text-primary" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search React, Python, Hacking, Figma..."
              className="w-full bg-transparent border-0 focus:outline-none text-sm"
            />
          </form>

          {searchResults.length > 0 ? (
            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-bold text-muted-foreground uppercase">Top Matches</p>
              {searchResults.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    setIsSearchDialogOpen(false);
                    navigate(`/course/${course.id}`);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={course.thumbnail} alt={course.title} className="h-10 w-14 object-cover rounded-lg" />
                    <div>
                      <p className="text-xs font-bold text-foreground line-clamp-1">{course.title}</p>
                      <p className="text-[10px] text-muted-foreground">{course.category} · {course.totalDuration}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary">₹{course.price.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          ) : (
            searchQuery.trim() !== "" && (
              <p className="text-xs text-muted-foreground text-center py-6">No courses found matching "{searchQuery}"</p>
            )
          )}
        </DialogContent>
      </Dialog>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(profile) => setUserProfile(profile)}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onProfileUpdated={(profile) => setUserProfile(profile)}
      />
    </header>
  );
};

export default Navbar;
