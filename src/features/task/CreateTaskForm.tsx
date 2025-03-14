import Input from "@/components/Input/Input";
import s from "./CreateTaskForm.module.css";
import Textarea from "@/components/Textarea/Textarea";
import Select from "@/components/Select/Select";
import DatePicker from "@/components/DatePicker/DatePicker";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";

export default function CreateTaskForm() {
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
          <Select name="department" required />
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
          <Select name="employee" required />
        </FormGroup>

        <div className={s.selectGroup}>
          <FormGroup label="პრიორიტეტი*" htmlFor="priority">
            <Select name="priority" required />
          </FormGroup>

          <FormGroup label="სტატუსი*" htmlFor="status">
            <Select name="status" required />
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
