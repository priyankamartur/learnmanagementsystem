import { Dialog, DialogContent } from "@/components/ui/dialog";
import CertificatePanel from "@/components/CertificatePanel";

export const CertificateModal = ({ isOpen, onClose, course }) => {
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
