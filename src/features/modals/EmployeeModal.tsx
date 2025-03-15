import Modal from "@/components/Modal/Modal";
import s from "./EmployeeModal.module.css";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";
import AvatarUpload from "@/components/AvatarUpload/AvatarUpload";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import { SelectOption } from "@/types";
import { validateField } from "@/utils/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "@/services/api";

type EmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EmployeeModal({ isOpen, onClose }: EmployeeModalProps) {
  const { departments } = useAppContext();

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    department: null as SelectOption | null,
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [validateOnSubmit, setValidateOnSubmit] = useState(false);
  
  const handleChange = (name: string, value: string) => {
    // Allow only Georgian (ა-ჰ) and English (A-Z, a-z) letters, plus spaces
    if (/^[a-zA-Zა-ჰ\s]*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (select: string, option: SelectOption) => {
    setFormData({ ...formData, [select]: option });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.surname ||
      !formData.department ||
      !avatarFile
    ) {
      setValidateOnSubmit(true);
      return;
    }

    if (
      validationErrors.name ||
      validationErrors.surname ||
      validationErrors.department ||
      validationErrors.avatar
    )
      return;

    mutate();
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("surname", formData.surname);
      formDataToSend.append(
        "department_id",
        String(formData.department?.id || 1)
      );

      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile); // Attach file
      }

      return createEmployee(formDataToSend); // Send FormData to API
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      handleClose();
    },
  });

  const reqs = {
    name: validateField(formData.name, 2, 255, undefined, validateOnSubmit),
    surname: validateField(
      formData.surname,
      2,
      255,
      undefined,
      validateOnSubmit
    ),
  };

  const validationErrors = {
    name: !reqs.name.fullReqs && reqs.name.validate,
    surname: !reqs.surname.fullReqs && reqs.surname.validate,
    avatar: !avatarFile && validateOnSubmit,
    department: !formData.department && validateOnSubmit,
  };

  const resetForm = () => {
    setFormData({
      name: "",
      surname: "",
      department: null,
    });
    setAvatarFile(null);
    setValidateOnSubmit(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="თანამშრომლის დამატება">
      <form className={s.form} onSubmit={handleSubmit}>
        <FormGroup
          label="სახელი*"
          minText="მინიმუმ 2 სიმბოლო"
          maxText="მაქსიმუმ 255 სიმბოლო"
          minError={!reqs.name.minReqs}
          maxError={!reqs.name.maxReqs}
          validate={reqs.name.validate}
        >
          <Input
            type="text"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
          />
        </FormGroup>

        <FormGroup
          label="გვარი*"
          minText="მინიმუმ 2 სიმბოლო"
          maxText="მაქსიმუმ 255 სიმბოლო"
          minError={!reqs.surname.minReqs}
          maxError={!reqs.surname.maxReqs}
          validate={reqs.surname.validate}
        >
          <Input
            type="text"
            value={formData.surname}
            onChange={(value) => handleChange("surname", value)}
          />
        </FormGroup>

        <FormGroup className={s.avatarWrapper} label="ავატარი*">
          <AvatarUpload
            setAvatarFile={setAvatarFile}
            hasError={validationErrors.avatar}
          />
        </FormGroup>

        <FormGroup label="დეპარტამენტი*">
          <Select
            options={departments}
            selected={formData.department}
            onChange={(option) => handleSelectChange("department", option)}
            hasError={validationErrors.department}
          />
        </FormGroup>

        <div className={s.buttonsWrapper}>
          <Button
            onClick={handleClose}
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
