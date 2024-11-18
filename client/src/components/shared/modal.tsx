import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="w-full overflow-y-auto px-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

Modal.displayName = "Modal";

export { Modal };
