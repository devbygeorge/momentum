import { useEffect, useRef, useState } from "react";
import CalendarIconSmall from "@/assets/icons/calendar-small.svg";
import s from "./DatePicker.module.css";
import CustomCalendar from "./CustomCalendar";
import { format } from "date-fns";
import clsx from "clsx";

type DatePickerProps = {
  selectedDate: Date;
  onChange: (date: Date) => void;
  disabledBefore?: Date;
};

export default function DatePicker({
  selectedDate,
  onChange,
  disabledBefore,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: Date) => {
    onChange(date);
    setIsOpen(false); // Close the datepicker after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={s.wrapper} ref={datePickerRef}>
      {/* Datepicker Input */}
      <div
        className={clsx(s.inputWrapper, { [s.isOpen]: isOpen })}
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
            disabledBefore={disabledBefore}
          />
        </div>
      )}
    </div>
  );
}
