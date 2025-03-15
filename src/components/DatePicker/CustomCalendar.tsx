import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import s from "./CustomCalendar.module.css";

import { customWeekdays, georgianMonths } from "@/utils/calendarConfig";

export default function CustomCalendar({
  onChange,
  selectedDate,
  onClose, // Add a function to close the calendar
}: {
  onChange: (date: Date) => void;
  selectedDate: Date;
  onClose: () => void; // New prop to handle closing
}) {
  const [tempDate, setTempDate] = useState<Date>(selectedDate);
  const [month, setMonth] = useState(selectedDate); // Keep the selected month

  return (
    <div className={s.calendarWrapper}>
      <DayPicker
        mode="single"
        selected={tempDate}
        onSelect={setTempDate} // Temporarily store the selected date
        disabled={{ before: selectedDate }}
        month={month}
        onMonthChange={setMonth}
        showOutsideDays
        formatters={{
          formatWeekdayName: (day) => customWeekdays[day.getDay()],
          formatCaption: (month) => {
            const year = month.getFullYear();
            return `${georgianMonths[month.getMonth()]} ${year}`;
          },
        }}
        required
      />
      <div className={s.footer}>
        {/* Cancel Button: Close without saving */}
        <button
          className={s.cancel}
          onClick={() => {
            setTempDate(selectedDate); // Reset selection
            onClose(); // Close calendar
          }}
        >
          Cancel
        </button>

        {/* OK Button: Save selection and close */}
        <button
          className={s.ok}
          onClick={() => {
            if (tempDate) {
              onChange(tempDate);
            }
            onClose(); // Close calendar after saving
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
