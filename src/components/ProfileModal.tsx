import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Briefcase, Award, Save, Camera, Check } from "lucide-react";
import { toast } from "sonner";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated?: (updatedUser: any) => void;
}

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
];

export const ProfileModal = ({ isOpen, onClose, onProfileUpdated }: ProfileModalProps) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user-profile");
    return saved
      ? JSON.parse(saved)
      : {
          id: "usr-1",
          name: "Alex Morgan",
          email: "alex.morgan@example.com",
          role: "Software Developer & Lifelong Learner",
          bio: "Passionate about full-stack web development, AI engineering, and building user-centric applications.",
          targetSkills: "React, Next.js, Python, AWS, System Design",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
        };
  });

  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [bio, setBio] = useState(user.bio);
  const [targetSkills, setTargetSkills] = useState(user.targetSkills);
  const [avatar, setAvatar] = useState(user.avatar);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user.name);
    setRole(user.role);
    setBio(user.bio);
    setTargetSkills(user.targetSkills);
    setAvatar(user.avatar);
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updated = {
      ...user,
      name,
      role,
      bio,
      targetSkills,
      avatar
    };

    try {
      // Send to Express Backend API
      const res = await fetch(`http://localhost:5000/api/profile/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, bio, targetSkills, avatar })
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem("user-profile", JSON.stringify(data.user));
        if (onProfileUpdated) onProfileUpdated(data.user);
        toast.success("Profile updated successfully!");
        onClose();
      } else {
        // Fallback to local save
        setUser(updated);
        localStorage.setItem("user-profile", JSON.stringify(updated));
        if (onProfileUpdated) onProfileUpdated(updated);
        toast.success("Profile saved!");
        onClose();
      }
    } catch (err) {
      // Offline fallback
      setUser(updated);
      localStorage.setItem("user-profile", JSON.stringify(updated));
      if (onProfileUpdated) onProfileUpdated(updated);
      toast.success("Profile updated!");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6 bg-card">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <User className="h-5 w-5 text-primary" /> Edit Student Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-5 pt-2">
          {/* Avatar Selector */}
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-2">Choose Avatar Profile Picture</label>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {AVATAR_OPTIONS.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatar(imgUrl)}
                  className={`relative rounded-full overflow-hidden shrink-0 transition-transform ${
                    avatar === imgUrl ? "ring-4 ring-primary scale-105" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={imgUrl} alt="Avatar option" className="h-12 w-12 object-cover" />
                  {avatar === imgUrl && (
                    <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required className="text-sm" />
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Professional Title / Role</label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} required className="text-sm" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Target Skill Goals</label>
            <Input
              value={targetSkills}
              onChange={(e) => setTargetSkills(e.target.value)}
              placeholder="e.g. React, Next.js, Python, AWS"
              className="text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Short Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="text-sm resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="gradient-primary text-primary-foreground font-semibold gap-1.5">
              <Save className="h-4 w-4" /> Save Profile
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
