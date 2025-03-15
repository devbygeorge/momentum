import { useEffect, useState } from "react";
import s from "./Modal.module.css";
import CancelIcon from "@/assets/icons/cancel.svg";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  const [visible, setVisible] = useState(isOpen);

  // Handle animation before closing
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 200); // Wait for fadeOut animation
    }
  }, [isOpen]);

  // Close modal when pressing "Escape"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`${s.backdrop} ${!isOpen ? s.hidden : ""}`}
      onClick={onClose}
      {...(!isOpen && { inert: true })}
    >
      <div
        className={`${s.modal} ${!isOpen ? s.hidden : ""}`}
        role="dialog"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.closeButton} onClick={onClose} aria-label="Close">
          <CancelIcon />
        </button>
        {title && (
          <h2 id="modal-title" className={s.modalHeading}>
            {title}
          </h2>
        )}
        <div className={s.modalContent}>{children}</div>
      </div>
    </div>
  );
}
