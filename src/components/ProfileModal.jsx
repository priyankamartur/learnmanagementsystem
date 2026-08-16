import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Sparkles, Save } from "lucide-react";
import { toast } from "sonner";

const avatarOptions = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
];

export const ProfileModal = ({ isOpen, onClose, onProfileUpdated }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [targetSkills, setTargetSkills] = useState("");
  const [avatar, setAvatar] = useState(avatarOptions[0]);

  useEffect(() => {
    const saved = localStorage.getItem("user-profile");
    if (saved) {
      const p = JSON.parse(saved);
      setName(p.name || "Alex Morgan");
      setRole(p.role || "Software Developer");
      setBio(p.bio || "");
      setTargetSkills(p.targetSkills || "");
      setAvatar(p.avatar || avatarOptions[0]);
    } else {
      setName("Alex Morgan");
      setRole("Software Developer & Lifelong Learner");
      setBio("Passionate about full-stack web development, AI engineering, and building user-centric applications.");
      setTargetSkills("React, Next.js, Python, AWS, System Design");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = { name, role, bio, targetSkills, avatar };
    localStorage.setItem("user-profile", JSON.stringify(updatedProfile));

    if (onProfileUpdated) onProfileUpdated(updatedProfile);
    toast.success("Profile details updated successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 bg-card border-2 border-primary/20">
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between mb-1">
            <Badge className="bg-primary/10 text-primary border-0 text-xs font-semibold">
              Student Profile
            </Badge>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <DialogTitle className="text-xl font-extrabold text-foreground">
            Edit Student Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Avatar Selector */}
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-2">Choose Avatar</label>
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {avatarOptions.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="avatar option"
                  onClick={() => setAvatar(img)}
                  className={`h-12 w-12 rounded-full object-cover cursor-pointer transition-all ${
                    avatar === img
                      ? "ring-4 ring-primary scale-110 shadow-md"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Full Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-sm font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Professional Title / Headline</label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Software Developer / Student Learner"
              className="text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Target Skills</label>
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

          <Button
            type="submit"
            className="w-full gradient-primary text-primary-foreground font-bold py-5 text-sm shadow-lg gap-2"
          >
            <Save className="h-4 w-4" /> Save Profile Details
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
