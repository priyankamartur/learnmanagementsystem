import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Download, Printer, Share2, CheckCircle2 } from "lucide-react";
import type { Course } from "@/data/courses";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

export const CertificateModal = ({ isOpen, onClose, course }: CertificateModalProps) => {
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem("user-student-name") || "Alex Morgan";
  });

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl sm:max-w-4xl p-0 overflow-hidden bg-card border-2 border-primary/20">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Award className="h-6 w-6 text-amber-500" />
            Official Certificate of Completion
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 md:p-10 space-y-6">
          {/* Certificate Container */}
          <div className="relative border-8 border-double border-amber-500/40 rounded-xl p-8 md:p-12 text-center bg-gradient-to-br from-background via-amber-500/5 to-background shadow-inner">
            {/* Corner Embellishments */}
            <div className="absolute top-3 left-3 text-xs font-serif text-amber-500/60 uppercase tracking-widest">
              LearnHub Verified
            </div>
            <div className="absolute top-3 right-3 text-xs font-serif text-amber-500/60 uppercase tracking-widest">
              ID: LH-{course.id.toUpperCase()}-2026
            </div>

            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 mb-4 ring-8 ring-amber-500/20">
              <Award className="h-10 w-10" />
            </div>

            <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-1">
              Certificate of Excellence
            </h2>
            <p className="text-xs text-muted-foreground mb-6">This is proudly presented to</p>

            <div className="mb-6">
              <input
                type="text"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  localStorage.setItem("user-student-name", e.target.value);
                }}
                className="text-2xl md:text-4xl font-extrabold text-foreground bg-transparent text-center border-b-2 border-dashed border-primary/30 focus:outline-none focus:border-primary px-4 py-1 font-serif transition-colors"
                title="Click to edit your name"
              />
              <p className="text-xs text-muted-foreground mt-1">(Click to customize name)</p>
            </div>

            <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-6">
              for successfully completing all required coursework, lessons, and practical assessments in
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-primary mb-6 max-w-xl mx-auto">
              "{course.title}"
            </h3>

            <div className="flex flex-wrap items-center justify-between border-t border-border/60 pt-6 mt-8 text-left text-xs md:text-sm text-muted-foreground gap-4">
              <div>
                <p className="font-semibold text-foreground">{course.instructor}</p>
                <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-500 font-semibold mb-0.5">
                  <CheckCircle2 className="h-4 w-4" /> 100% Completed
                </div>
                <p className="text-xs">{currentDate}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">LearnHub Academy</p>
                <p className="text-xs text-muted-foreground">Certified Credential</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Shareable & downloadable credential
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5">
                <Printer className="h-4 w-4" /> Print / Save PDF
              </Button>
              <Button size="sm" onClick={onClose} className="gradient-primary text-primary-foreground font-semibold">
                Done
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
