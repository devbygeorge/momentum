import { useModal } from "@/context/ModalContext";
import EmployeeModal from "./EmployeeModal";

// This component conditionally renders modals
export default function GlobalModals() {
  const { activeModal, closeModal } = useModal();

  return (
    <>
      <EmployeeModal isOpen={activeModal === "employee"} onClose={closeModal} />
    </>
  );
}
