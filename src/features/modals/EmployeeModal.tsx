import Modal from "@/components/Modal/Modal";
import s from "./EmployeeModal.module.css";

type EmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EmployeeModal({ isOpen, onClose }: EmployeeModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee created!");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="თანამშრომლის დამატება">
      <form className={s.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <button type="submit">Create</button>
      </form>
    </Modal>
  );
}
