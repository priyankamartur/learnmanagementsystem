import { useState } from "react";
import { Award, Download, Printer, Share2, CheckCircle2, ShieldCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Course } from "@/data/courses";

interface CertificatePanelProps {
  course: Course;
  onOpenFullModal?: () => void;
}

export const CertificatePanel = ({ course, onOpenFullModal }: CertificatePanelProps) => {
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem("user-student-name") || "Alex Morgan";
  });

  const credentialId = `LH-CERT-${course.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Certificate Credential verification link copied to clipboard!");
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl border-2 border-amber-500/30 bg-card shadow-lg space-y-6 relative overflow-hidden">
      {/* Background Seal Embellishment */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 ring-4 ring-amber-500/20">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-foreground">Official Course Certificate</h3>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 text-[10px]">Verified</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Credential ID: {credentialId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5 text-xs font-semibold">
            <Share2 className="h-4 w-4 text-primary" /> Share Badge
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5 text-xs font-semibold">
            <Printer className="h-4 w-4 text-amber-500" /> Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Decorative Printable Certificate Preview Card */}
      <div className="relative border-4 border-double border-amber-500/40 rounded-xl p-6 md:p-10 text-center bg-gradient-to-br from-background via-amber-500/5 to-background shadow-inner">
        <div className="text-[10px] uppercase font-serif tracking-widest text-amber-500/70 mb-2">
          LearnHub Academy Verified Credential
        </div>

        <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
          Certificate of Completion
        </h2>
        <p className="text-[11px] text-muted-foreground mb-4">This certifies that</p>

        <div className="mb-4">
          <input
            type="text"
            value={studentName}
            onChange={(e) => {
              setStudentName(e.target.value);
              localStorage.setItem("user-student-name", e.target.value);
            }}
            className="text-xl md:text-3xl font-extrabold text-foreground bg-transparent text-center border-b-2 border-dashed border-primary/30 focus:outline-none focus:border-primary px-3 py-1 font-serif transition-colors"
            title="Click to edit your certificate name"
          />
        </div>

        <p className="text-xs text-muted-foreground max-w-md mx-auto mb-4">
          has successfully completed all required coursework, video lessons, and section quizzes for
        </p>

        <h4 className="text-base md:text-xl font-bold text-primary mb-6 max-w-lg mx-auto">
          "{course.title}"
        </h4>

        <div className="flex flex-wrap items-center justify-between border-t pt-4 text-left text-xs text-muted-foreground gap-4">
          <div>
            <p className="font-bold text-foreground">{course.instructor}</p>
            <p className="text-[10px] text-muted-foreground">{course.instructorTitle}</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-500 font-bold mb-0.5">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Completed
            </div>
            <p className="text-[10px]">{currentDate}</p>
          </div>

          <div className="text-right">
            <p className="font-bold text-foreground">LearnHub Academy</p>
            <p className="text-[10px] text-muted-foreground">Verification Seal</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-4 w-4 text-emerald-500" /> Tamper-proof digital credential
        </span>
        {onOpenFullModal && (
          <button
            onClick={onOpenFullModal}
            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
          >
            Open Fullscreen Certificate <ExternalLink className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CertificatePanel;
