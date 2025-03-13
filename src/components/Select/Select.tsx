import s from "./Select.module.css";
import { useState } from "react";

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

export default function Select({
  name,
  required,
}: // options,
// selected,
// onChange,
SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(name, required);
  const selected = { value: "low", label: "Low" };
  const onChange = (option: Option) => {
    console.log(option);
  };
  const options = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  return (
    <div className={s.wrapper}>
      {/* Select Button */}
      <button
        className={s.button}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {selected ? selected.label : "Select an option"}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className={s.dropdown}>
          {options.map((option) => (
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
      )}
    </div>
  );
}
