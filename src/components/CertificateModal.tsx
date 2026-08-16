import { Dialog, DialogContent } from "@/components/ui/dialog";
import CertificatePanel from "@/components/CertificatePanel";
import type { Course } from "@/data/courses";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

export const CertificateModal = ({ isOpen, onClose, course }: CertificateModalProps) => {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-4 bg-transparent border-0 shadow-none">
        <CertificatePanel course={course} />
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
