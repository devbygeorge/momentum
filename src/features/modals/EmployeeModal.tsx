import Modal from "@/components/Modal/Modal";
import s from "./EmployeeModal.module.css";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";
import AvatarUpload from "@/components/AvatarUpload/AvatarUpload";

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
        <FormGroup
          label="სახელი*"
          htmlFor="first-name"
          minText="მინიმუმ 2 სიმბოლო"
          maxText="მაქსიმუმ 255 სიმბოლო"
        >
          <Input type="text" name="first-name" required />
        </FormGroup>

        <FormGroup
          label="გვარი*"
          htmlFor="last-name"
          minText="მინიმუმ 2 სიმბოლო"
          maxText="მაქსიმუმ 255 სიმბოლო"
        >
          <Input type="text" name="last-name" required />
        </FormGroup>

        <FormGroup
          className={s.avatarWrapper}
          label="ავატარი*"
          htmlFor="avatar"
        >
          <AvatarUpload />
        </FormGroup>

        <FormGroup label="დეპარტამენტი*" htmlFor="department">
          <Select name="department" />
        </FormGroup>

        <div className={s.buttonsWrapper}>
          <Button
            onClick={onClose}
            className={s.cancelButton}
            variant="outline"
          >
            გაუქმება
          </Button>
          <Button type="submit" className={s.addEmployeeButton}>
            დაამატე თანამშრომელი
          </Button>
        </div>
      </form>
    </Modal>
  );
}
