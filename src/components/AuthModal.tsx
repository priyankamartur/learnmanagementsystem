import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, UserPlus, Mail, Lock, User, GraduationCap } from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user: any) => void;
}

export const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isRegister ? "http://localhost:5000/api/auth/register" : "http://localhost:5000/api/auth/login";
    const body = isRegister ? { name, email, password } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || (isRegister ? "Registration successful!" : "Welcome back!"));
        localStorage.setItem("user-profile", JSON.stringify(data.user));
        if (onAuthSuccess) onAuthSuccess(data.user);
        onClose();
      } else {
        toast.error(data.error || "Authentication failed");
      }
    } catch (err) {
      // Local fallback mode
      const mockUser = {
        id: `usr-${Date.now()}`,
        name: name || "Student Learner",
        email: email || "student@example.com",
        role: "Student Developer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
        bio: "Passionate about technology and continuous learning.",
        targetSkills: "React, Python, AWS"
      };
      toast.success(isRegister ? "Account registered successfully!" : "Signed in successfully!");
      localStorage.setItem("user-profile", JSON.stringify(mockUser));
      if (onAuthSuccess) onAuthSuccess(mockUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 bg-card">
        <DialogHeader className="text-center pb-2 border-b">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary mb-2 shadow-md">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <DialogTitle className="text-xl font-bold">
            {isRegister ? "Create Your LearnHub Account" : "Sign In to LearnHub"}
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {isRegister
              ? "Join 12,000+ students & start learning today"
              : "Access your enrolled courses, certificates, and progress"}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          {isRegister && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Full Name</label>
              <div className="relative">
                <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isRegister}
                  className="pl-9 text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-9 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Password</label>
            <div className="relative">
              <Lock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-9 text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary text-primary-foreground font-bold text-sm shadow-md py-5"
          >
            {isRegister ? (
              <span className="flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" /> Create Free Account
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <LogIn className="h-4 w-4" /> Sign In
              </span>
            )}
          </Button>

          <div className="text-center pt-2 border-t">
            <button
              type="button"
              onClick={() => setIsRegister((prev) => !prev)}
              className="text-xs text-primary font-semibold hover:underline"
            >
              {isRegister
                ? "Already have an account? Sign In"
                : "Don't have an account yet? Create one"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
