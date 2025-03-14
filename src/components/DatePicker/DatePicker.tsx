import { useState } from "react";
import s from "./DatePicker.module.css";
import CalendarIconSmall from "@/assets/icons/calendar-small.svg";

type DatePickerProps = {
  name: string;
};

export default function DatePicker({ name }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(name);
  return (
    <div className={s.wrapper}>
      {/* Datepicker Input */}
      <div
        className={`${s.inputWrapper} ${isOpen ? s.isOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIconSmall />
        <input type="text" placeholder="DD/MM/YYYY" />
      </div>
    </div>
  );
}
