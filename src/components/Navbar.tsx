import { useState } from "react";
import { GraduationCap, Search, LayoutDashboard, User, BookOpen, Flame, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";
import ProfileModal from "./ProfileModal";
import AuthModal from "./AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { courses } from "@/data/courses";

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Auth & Profile Modals state
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user-profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Alex Morgan",
          email: "alex.morgan@example.com",
          role: "Software Developer",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
        };
  });

  const filteredCourses = query.trim()
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase()) ||
          c.instructor.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-md group-hover:scale-105 transition-transform">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold text-foreground tracking-tight">
            Learn<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 font-semibold">
            <BookOpen className="h-4 w-4 text-primary" /> All Courses ({courses.length}+)
          </Link>
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <LayoutDashboard className="h-4 w-4" /> My Dashboard
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 border-border/60 hover:bg-muted"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search 50+ courses...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-card px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              ⌘K
            </kbd>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="sm:hidden text-muted-foreground"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Streak Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold" title="5 Day Learning Streak!">
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>5 Streak</span>
          </div>

          {/* User Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full ring-2 ring-primary/20">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none text-foreground">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setProfileOpen(true)} className="cursor-pointer">
                <User className="h-4 w-4 mr-2 text-primary" /> Edit Student Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                <LayoutDashboard className="h-4 w-4 mr-2" /> Student Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/courses")} className="cursor-pointer">
                <BookOpen className="h-4 w-4 mr-2" /> Courses Collection (50+)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setAuthOpen(true)} className="cursor-pointer">
                <LogIn className="h-4 w-4 mr-2" /> Switch Account / Register
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Global Search Dialog Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-xl p-4 bg-card top-1/3">
          <DialogHeader>
            <DialogTitle className="sr-only">Search Courses</DialogTitle>
          </DialogHeader>
          <div className="flex items-center border-b px-3 pb-3">
            <Search className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across 50+ courses (e.g. React, Docker, Security, Figma)..."
              className="border-0 focus-visible:ring-0 text-base bg-transparent p-0"
              autoFocus
            />
          </div>
          <div className="max-h-80 overflow-y-auto pt-2 space-y-1">
            {query.trim() === "" ? (
              <p className="text-xs text-center py-6 text-muted-foreground">
                Type to search across {courses.length} courses and technical domains
              </p>
            ) : filteredCourses.length === 0 ? (
              <p className="text-sm text-center py-6 text-muted-foreground">No matching courses found</p>
            ) : (
              filteredCourses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSearchOpen(false);
                    navigate(`/course/${c.id}`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-left transition-colors"
                >
                  <img src={c.thumbnail} alt={c.title} className="h-12 w-16 object-cover rounded-md shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate text-foreground">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.category} · {c.instructor}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Edit Modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onProfileUpdated={(updated) => setCurrentUser(updated)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />
    </nav>
  );
};

export default Navbar;
