import s from "./DatePicker.module.css";

type DatePickerProps = {
  name: string;
};

export default function DatePicker({ name }: DatePickerProps) {
  console.log(name);
  return <div className={s.wrapper}>Datepicker</div>;
}
