import { useState } from "react";
import CalendarIconSmall from "@/assets/icons/calendar-small.svg";
import s from "./DatePicker.module.css";
import CustomCalendar from "./CustomCalendar";
import { format } from "date-fns";

type DatePickerProps = {
  selectedDate: Date;
  onChange: (date: Date) => void;
};

export default function DatePicker({
  selectedDate,
  onChange,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: Date) => {
    onChange(date);
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
          />
        </div>
      )}
    </div>
  );
}
