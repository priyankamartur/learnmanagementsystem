import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Lock, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const AuthModal = ({ isOpen, onClose, initialMode = "register", onAuthSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const userProfile = {
        name: name || (email ? email.split("@")[0] : "Learner"),
        email: email || "student@example.com",
        role: "Student Developer",
        bio: "Passionate developer building skills on LearnHub Academy.",
        targetSkills: "React, Next.js, Python, System Design",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
      };

      localStorage.setItem("user-profile", JSON.stringify(userProfile));

      if (mode === "register") {
        toast.success("Account created successfully! Welcome to LearnHub.");
      } else {
        toast.success("Logged in successfully!");
      }

      if (onAuthSuccess) onAuthSuccess(userProfile);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 bg-card border-2 border-primary/20">
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-primary/10 text-primary border-0 text-xs font-semibold">
              {mode === "register" ? "Create Account" : "Welcome Back"}
            </Badge>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <DialogTitle className="text-2xl font-extrabold text-foreground">
            {mode === "register" ? "Start Your Learning Journey" : "Sign In to LearnHub"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {mode === "register" && (
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Full Name</label>
              <div className="relative">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  required
                  className="pl-9 text-sm"
                />
                <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Email Address</label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                required
                className="pl-9 text-sm"
              />
              <Mail className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Password</label>
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pl-9 text-sm"
              />
              <Lock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary text-primary-foreground font-bold py-5 text-sm shadow-lg gap-2"
          >
            {loading ? (
              "Processing..."
            ) : mode === "register" ? (
              <>
                Register Account <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Sign In <CheckCircle2 className="h-4 w-4" />
              </>
            )}
          </Button>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t">
            {mode === "register" ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary font-bold hover:underline"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-primary font-bold hover:underline"
                >
                  Create One Now
                </button>
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
