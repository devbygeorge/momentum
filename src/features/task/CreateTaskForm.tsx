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

export default function CreateTaskForm() {
  const { statuses, departments, priorities, employees } = useAppContext();

  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(
    null
  );

  const averageOption =
    priorities?.find((item) => item.name === "საშუალო") || null;

  const [selectedPriority, setSelectedPriority] = useState<Option | null>(
    averageOption
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Option | null>(null);

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={(e) => e.preventDefault()}>
        <FormGroup
          label="სათაური*"
          htmlFor="title"
          minText="მინიმუმ 2 სიმბოლო"
          maxText="მაქსიმუმ 255 სიმბოლო"
        >
          <Input type="text" name="title" required />
        </FormGroup>

        <FormGroup label="დეპარტამენტი*" htmlFor="department">
          <Select
            name="department"
            options={departments}
            selected={selectedDepartment}
            onChange={setSelectedDepartment}
            required
          />
        </FormGroup>

        <FormGroup
          label="აღწერა"
          htmlFor="description"
          minText="მინიმუმ 4 სიტყვა"
          maxText="მაქსიმუმ 255 სიმბოლო"
        >
          <Textarea name="description" />
        </FormGroup>

        <FormGroup label="პასუხისმგებელი თანამშრომელი*" htmlFor="employee">
          <Select
            name="employee"
            options={employees}
            selected={selectedEmployee}
            onChange={setSelectedEmployee}
            required
          />
        </FormGroup>

        <div className={s.selectGroup}>
          <FormGroup label="პრიორიტეტი*" htmlFor="priority">
            <Select
              name="priority"
              options={priorities}
              selected={selectedPriority}
              onChange={setSelectedPriority}
              required
            />
          </FormGroup>

          <FormGroup label="სტატუსი*" htmlFor="status">
            <Select
              name="status"
              options={statuses}
              selected={selectedStatus}
              onChange={setSelectedStatus}
              required
            />
          </FormGroup>
        </div>

        <FormGroup label="დედლაინი*" htmlFor="status">
          <DatePicker name="deadline" />
        </FormGroup>

        <Button className={s.formButton} type="submit">
          დავალების შექმნა
        </Button>
      </form>
    </div>
  );
}
