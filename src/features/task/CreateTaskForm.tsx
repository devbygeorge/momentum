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
import { addDays } from "date-fns";
import { validateField } from "@/utils/validation";

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

  const nextDay = addDays(new Date(), 1);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: defaultStatus as Option | null,
    priority: defaultPriority as Option | null,
    employee: null as Option | null,
    department: null as Option | null,
    date: nextDay,
  });

  const [validateOnSubmit, setValidateOnSubmit] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (select: string, option: Option) => {
    setFormData({ ...formData, [select]: option });
  };

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.department || !formData.employee) {
      setValidateOnSubmit(true);
      return;
    }

    if (
      validationErrors.title ||
      validationErrors.description ||
      validationErrors.department ||
      validationErrors.employee
    )
      return;
  };

  const reqs = {
    title: validateField(formData.title, 2, 255, undefined, validateOnSubmit),
    description: validateField(formData.description, 4, 255, 4), // Min 4 words
  };

  const validationErrors = {
    title: !reqs.title.fullReqs && reqs.title.validate,
    description: !reqs.description.fullReqs && reqs.description.validate,
    department: !formData.department && validateOnSubmit,
    employee: !formData.employee && validateOnSubmit,
  };

  const filteredEmployees = employees?.filter(
    (employee) => employee.department_id === formData.department?.id
  );

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={handleSubmit}>
        <FormGroup
          label="სათაური*"
          minText="მინიმუმ 2 სიმბოლო"
          maxText="მაქსიმუმ 255 სიმბოლო"
          minError={!reqs.title.minReqs}
          maxError={!reqs.title.maxReqs}
          validate={reqs.title.validate}
        >
          <Input
            type="text"
            value={formData.title}
            onChange={(value) => handleChange("title", value)}
            hasError={validationErrors.title}
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

        <FormGroup
          label="აღწერა"
          minText="მინიმუმ 4 სიტყვა"
          maxText="მაქსიმუმ 255 სიმბოლო"
          minError={!reqs.description.minReqs}
          maxError={!reqs.description.maxReqs}
          validate={reqs.description.validate}
        >
          <Textarea
            design="light"
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
            hasError={validationErrors.description}
          />
        </FormGroup>

        <FormGroup label="პასუხისმგებელი თანამშრომელი*">
          <Select
            mode="employee"
            options={filteredEmployees}
            selected={formData.employee}
            onChange={(option) => handleSelectChange("employee", option)}
            isDisabled={!formData.department}
            hasError={validationErrors.employee}
          />
        </FormGroup>

        <div className={s.selectGroup}>
          <FormGroup label="პრიორიტეტი*">
            <Select
              mode="priority"
              options={priorities}
              selected={formData.priority}
              onChange={(option) => handleSelectChange("priority", option)}
            />
          </FormGroup>

          <FormGroup label="სტატუსი*">
            <Select
              options={statuses}
              selected={formData.status}
              onChange={(option) => handleSelectChange("status", option)}
            />
          </FormGroup>
        </div>

        <FormGroup label="დედლაინი*">
          <DatePicker
            selectedDate={formData.date}
            onChange={handleDateChange}
          />
        </FormGroup>

        <Button className={s.formButton} type="submit">
          დავალების შექმნა
        </Button>
      </form>
    </div>
  );
}
