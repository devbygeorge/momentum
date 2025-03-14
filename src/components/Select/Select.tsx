import s from "./Select.module.css";
import { useState } from "react";
import ArrowDownSmallIcon from "@/assets/icons/arrow-down-small.svg";

export type Option = {
  id: number;
  name: string;
  icon?: string;
};

type SelectProps = {
  name: string;
  options: Option[];
  selected: Option | null;
  onChange: (option: Option) => void;
  required?: boolean;
};

export default function Select({
  name,
  options,
  selected,
  onChange,
  required,
}: SelectProps) {
  console.log(name, required);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={s.wrapper}>
      {/* Select Button */}
      <button
        className={`${s.button} ${isOpen ? s.isButtonOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {selected ? selected.name : "აირჩიეთ"}

        <ArrowDownSmallIcon />
      </button>

      {/* Dropdown List */}
      <ul className={`${s.dropdown} ${isOpen ? s.dropdownOpen : ""}`}>
        {options.map((option) => (
          <li
            key={option.id}
            className={s.option}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
