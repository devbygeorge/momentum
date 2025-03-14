import { useState } from "react";
import CalendarIconSmall from "@/assets/icons/calendar-small.svg";
import s from "./DatePicker.module.css";
import CustomCalendar from "./CustomCalendar";
import { addDays, format } from "date-fns";

type DatePickerProps = {
  name: string;
};

export default function DatePicker({ name }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const nextDay = addDays(new Date(), 1);

  const [selectedDate, setSelectedDate] = useState<Date>(nextDay);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false); // Close the datepicker after selection
  };

  return (
    <div className={s.wrapper}>
      {/* Datepicker Input */}
      <div
        className={`${s.inputWrapper} ${isOpen ? s.isOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIconSmall />
        <input
          type="text"
          name={name}
          placeholder="DD/MM/YYYY"
          value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
          readOnly
        />
      </div>

      {/* Datepicker Dropdown */}
      {isOpen && (
        <div className={s.pickerWrapper}>
          <CustomCalendar
            onClose={() => setIsOpen(false)}
            onChange={handleDateChange}
            selectedDate={selectedDate}
            nextDay={nextDay}
          />
        </div>
      )}
    </div>
  );
}
