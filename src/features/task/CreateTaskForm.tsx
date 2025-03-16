import Input from "@/components/Input/Input";
import s from "./CreateTaskForm.module.css";
import Textarea from "@/components/Textarea/Textarea";
import Select from "@/components/Select/Select";
import DatePicker from "@/components/DatePicker/DatePicker";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { validateField } from "@/utils/validation";
import { SelectOption, Task } from "@/types";

import {
  FORM_STORAGE_KEY,
  DEFAULT_STATUS,
  DEFAULT_PRIORITY,
} from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/services/api";
import { useRouter } from "next/router";

export default function CreateTaskForm() {
  const router = useRouter();

  const { statuses, departments, priorities, employees } = useAppContext();

  const nextDay = addDays(new Date(), 1);

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: DEFAULT_STATUS,
    priority: DEFAULT_PRIORITY,
    employee: null as SelectOption | null,
    department: null as SelectOption | null,
    date: nextDay,
  });

  const [validateOnSubmit, setValidateOnSubmit] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (select: string, option: SelectOption) => {
    if (select === "department" && option.id !== formData?.department?.id) {
      setFormData({ ...formData, [select]: option, employee: null });
    } else {
      setFormData({ ...formData, [select]: option });
    }
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

    mutate();
  };

  const { mutate } = useMutation({
    mutationFn: () =>
      createTask({
        name: formData.title,
        description: formData.description,
        due_date: formData.date,
        status_id: formData.status.id,
        employee_id: formData.employee?.id || 1,
        priority_id: formData.priority.id,
      }),
    onSuccess: (task) => {
      localStorage.removeItem(FORM_STORAGE_KEY);
      setFormData({
        title: "",
        description: "",
        status: DEFAULT_STATUS,
        priority: DEFAULT_PRIORITY,
        employee: null,
        department: null,
        date: nextDay,
      });

      queryClient.setQueryData(["tasks"], (oldTasks: Task[]) => {
        return [...oldTasks, task];
      });

      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      router.push(`/`);
    },
  });

  const reqs = {
    title: validateField(formData.title, 3, 255, undefined, validateOnSubmit),
    description: validateField(formData.description, 4, 255, 4), // Min 4 words
  };

  const validationErrors = {
    title: !reqs.title.fullReqs && reqs.title.validate,
    description: !reqs.description.fullReqs && reqs.description.validate,
    department: !formData.department && validateOnSubmit,
    employee: !formData.employee && validateOnSubmit,
  };

  const filteredEmployees = employees?.filter(
    (employee) => employee?.department?.id === formData.department?.id
  );

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const savedFormData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    }, 500); // Debounce for 500ms

    return () => clearTimeout(handler); // Cleanup timeout on each re-render
  }, [formData]);

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={handleSubmit}>
        <FormGroup
          label="სათაური*"
          minText="მინიმუმ 3 სიმბოლო"
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
            disabledBefore={nextDay}
          />
        </FormGroup>

        <Button className={s.formButton} type="submit">
          დავალების შექმნა
        </Button>
      </form>
    </div>
  );
}
