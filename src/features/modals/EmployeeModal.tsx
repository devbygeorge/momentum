import Modal from "@/components/Modal/Modal";
import s from "./EmployeeModal.module.css";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";
import AvatarUpload from "@/components/AvatarUpload/AvatarUpload";
import { useAppContext } from "@/context/AppContext";
import { Option } from "@/components/Select/Select";
import { useState } from "react";

type EmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EmployeeModal({ isOpen, onClose }: EmployeeModalProps) {
  const { departments } = useAppContext();
  const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(
    null
  );

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
          minText="მინიმუმ 2 სიმბოლო"
          maxText="მაქსიმუმ 255 სიმბოლო"
        >
          <Input type="text" value="" onChange={() => {}} />
        </FormGroup>

        <FormGroup
          label="გვარი*"
          minText="მინიმუმ 2 სიმბოლო"
          maxText="მაქსიმუმ 255 სიმბოლო"
        >
          <Input type="text" value="" onChange={() => {}} />
        </FormGroup>

        <FormGroup className={s.avatarWrapper} label="ავატარი*">
          <AvatarUpload />
        </FormGroup>

        <FormGroup label="დეპარტამენტი*">
          <Select
            options={departments}
            selected={selectedDepartment}
            onChange={setSelectedDepartment}
          />
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
