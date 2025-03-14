import Input from "@/components/Input/Input";
import s from "./CreateTaskForm.module.css";
import Textarea from "@/components/Textarea/Textarea";
import Select from "@/components/Select/Select";
import DatePicker from "@/components/DatePicker/DatePicker";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import { Option } from "@/components/Select/Select";

const defaultStatus = {
  id: 1,
  name: "დასაწყები",
};

const defaultPriority = {
  id: 2,
  name: "საშუალო",
  icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Medium.svg",
};

export default function CreateTaskForm() {
  const { statuses, departments, priorities, employees } = useAppContext();

  const [selectedStatus, setSelectedStatus] = useState<Option | null>(
    defaultStatus
  );
  const [selectedPriority, setSelectedPriority] = useState<Option | null>(
    defaultPriority
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Option | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(
    null
  );

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        <FormGroup
          label="სათაური*"
          minText="მინიმუმ 2 სიმბოლო"
          maxText="მაქსიმუმ 255 სიმბოლო"
        >
          <Input type="text" />
        </FormGroup>

        <FormGroup label="დეპარტამენტი*">
          <Select
            options={departments}
            selected={selectedDepartment}
            onChange={setSelectedDepartment}
          />
        </FormGroup>

        <FormGroup
          label="აღწერა"
          minText="მინიმუმ 4 სიტყვა"
          maxText="მაქსიმუმ 255 სიმბოლო"
        >
          <Textarea />
        </FormGroup>

        <FormGroup label="პასუხისმგებელი თანამშრომელი*">
          <Select
            mode="employee"
            options={employees}
            selected={selectedEmployee}
            onChange={setSelectedEmployee}
            isDisabled={!selectedDepartment}
          />
        </FormGroup>

        <div className={s.selectGroup}>
          <FormGroup label="პრიორიტეტი*">
            <Select
              mode="priority"
              options={priorities}
              selected={selectedPriority}
              onChange={setSelectedPriority}
            />
          </FormGroup>

          <FormGroup label="სტატუსი*">
            <Select
              options={statuses}
              selected={selectedStatus}
              onChange={setSelectedStatus}
            />
          </FormGroup>
        </div>

        <FormGroup label="დედლაინი*">
          <DatePicker name="deadline" />
        </FormGroup>

        <Button className={s.formButton} type="submit">
          დავალების შექმნა
        </Button>
      </form>
    </div>
  );
}
