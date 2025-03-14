import s from "./Select.module.css";
import { useState } from "react";
import ArrowDownSmallIcon from "@/assets/icons/arrow-down-small.svg";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  name: string;
  required?: boolean;
  options?: Option[];
  selected?: Option | null;
  onChange?: (option: Option) => void;
};

const OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function Select({
  name,
  required,
}: // options,
// selected,
// onChange,
SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(OPTIONS[0]);

  console.log(name, required);
  const onChange = (option: Option) => {
    setSelected(option);
  };

  return (
    <div className={s.wrapper}>
      {/* Select Button */}
      <button
        className={`${s.button} ${isOpen ? s.isButtonOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {selected ? selected.label : "Select an option"}

        <ArrowDownSmallIcon />
      </button>

      {/* Dropdown List */}
      <ul className={`${s.dropdown} ${isOpen ? s.dropdownOpen : ""}`}>
        {OPTIONS.map((option) => (
          <li
            key={option.value}
            className={s.option}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
