import Input from "@/components/Input/Input";
import s from "./CreateTaskForm.module.css";
import Textarea from "@/components/Textarea/Textarea";
import Select from "@/components/Select/Select";
import DatePicker from "@/components/DatePicker/DatePicker";
import Button from "@/components/Button/Button";

export default function CreateTaskForm() {
  return (
    <div className={s.wrapper}>
      <form>
        {/* First column */}
        <div className={s.column}>
          <div className={s.formGroup}>
            <label htmlFor="title">სათაური*</label>
            <Input type="text" name="title" required />
            <span>მინიმუმ 2 სიმბოლო</span>
            <span>მაქსიმუმ 255 სიმბოლო</span>
          </div>

          <div className={s.formGroup}>
            <label htmlFor="description">აღწერა</label>
            <Textarea name="description" />
            <span>მინიმუმ 2 სიმბოლო</span>
            <span>მაქსიმუმ 255 სიმბოლო</span>
          </div>

          {/* 2 selects side by side */}
          <div className={s.selectGroup}>
            <div>
              <label htmlFor="priority">პრიორიტეტი*</label>
              <Select name="priority" required />
            </div>
            <div>
              <label htmlFor="status">სტატუსი*</label>
              <Select name="status" required />
            </div>
          </div>
        </div>

        {/* Second column */}
        <div className={s.column}>
          <div className={s.formGroup}>
            <label htmlFor="department">დეპარტამენტი*</label>
            <Select name="department" required />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="employee">პასუხისმგებელი თანამშრომელი*</label>
            <Select name="employee" required />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="deadline">დედლაინი</label>
            <DatePicker name="deadline" />
          </div>

          <Button type="submit">დავალების შექმნა</Button>
        </div>
      </form>
    </div>
  );
}
