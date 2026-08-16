import { useState } from "react";
import { Award, Printer, Share2, ShieldCheck, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { Course } from "@/data/courses";

interface CertificatePanelProps {
  course: Course;
  onOpenFullModal?: () => void;
}

export const CertificatePanel = ({ course, onOpenFullModal }: CertificatePanelProps) => {
  const [studentName, setStudentName] = useState(() => {
    const saved = localStorage.getItem("user-profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name) return parsed.name;
      } catch (e) {}
    }
    return "Alex Morgan";
  });

  const [isEditingName, setIsEditingName] = useState(false);

  const issueDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const credentialId = `LH-CERT-${course.id.toUpperCase()}-8924`;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Certificate verification link copied to clipboard!");
  };

  return (
    <div className="rounded-3xl border-2 border-amber-500/30 bg-gradient-to-b from-card via-card to-amber-500/5 p-6 md:p-8 shadow-xl space-y-6 relative overflow-hidden">
      {/* Decorative Gold Seal Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <Badge className="bg-amber-500 text-white font-bold border-0 text-xs px-3 py-1 shadow-md gap-1">
          <Award className="h-3.5 w-3.5" /> VERIFIED CERTIFICATE
        </Badge>
      </div>

      <div className="space-y-4 text-center border-b pb-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 ring-8 ring-amber-500/20 shadow-inner mb-1">
          <Award className="h-9 w-9" />
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-widest font-extrabold text-amber-600 dark:text-amber-400">
            Official Certificate of Completion
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mt-1">
            LearnHub Academy
          </h2>
        </div>

        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          This is to certify that the learner has successfully completed all required modules, assessments, and section quizzes for:
        </p>

        <h3 className="text-lg md:text-xl font-bold text-primary max-w-lg mx-auto">
          "{course.title}"
        </h3>
      </div>

      {/* Recipient & Instructor Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center py-2">
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Issued To</p>
          {isEditingName ? (
            <div className="flex items-center justify-center gap-1">
              <Input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="h-8 text-xs font-bold text-center w-40"
              />
              <Button size="sm" onClick={() => setIsEditingName(false)} className="h-8 text-xs">
                Save
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-sm font-extrabold text-foreground">{studentName}</span>
              <button onClick={() => setIsEditingName(true)} title="Edit certificate name">
                <Edit className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Lead Instructor</p>
          <p className="text-sm font-bold text-foreground">{course.instructor}</p>
          <p className="text-[10px] text-muted-foreground">{course.instructorTitle}</p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Issue Date & ID</p>
          <p className="text-xs font-bold text-foreground">{issueDate}</p>
          <p className="text-[10px] font-mono text-muted-foreground">{credentialId}</p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>Verifiable online credential</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5 text-xs font-semibold">
            <Share2 className="h-3.5 w-3.5 text-primary" /> Share Credential
          </Button>

          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5 text-xs font-semibold">
            <Printer className="h-3.5 w-3.5 text-primary" /> Print / Save PDF
          </Button>

          {onOpenFullModal && (
            <Button size="sm" onClick={onOpenFullModal} className="gradient-primary text-primary-foreground font-semibold text-xs gap-1">
              Full Screen Certificate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificatePanel;
