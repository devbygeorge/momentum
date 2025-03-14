import s from "./Select.module.css";
import { useEffect, useRef, useState } from "react";
import ArrowDownSmallIcon from "@/assets/icons/arrow-down-small.svg";
import AddIcon from "@/assets/icons/add.svg";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";

export type Option = {
  id: number;
  name: string;
  icon?: string;
  surname?: string;
  avatar?: string;
  department_id?: number;
};

type SelectProps = {
  mode?: "default" | "employee" | "priority";
  options: Option[];
  selected: Option | null;
  onChange: (option: Option) => void;
  isDisabled?: boolean;
  hasError?: boolean;
};

export default function Select({
  mode,
  options,
  selected,
  onChange,
  isDisabled,
  hasError,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const { openModal } = useModal();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
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
    <div
      className={`${s.wrapper} ${isDisabled ? s.isDisabled : ""}`}
      ref={selectRef}
    >
      {/* Select Button */}
      <button
        className={`${s.button} ${isOpen ? s.isButtonOpen : ""} ${
          hasError ? s.hasError : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {mode === "priority" && (
          <Image
            src={selected?.icon || ""}
            alt={selected?.name || ""}
            width={16}
            height={18}
          />
        )}

        <span className={s.buttonText}>
          {selected ? selected.name : "აირჩიეთ"}
        </span>

        <ArrowDownSmallIcon />
      </button>

      {/* Dropdown List */}
      <ul className={`${s.dropdown} ${isOpen ? s.dropdownOpen : ""}`}>
        {mode === "employee" && (
          <li
            className={`${s.option} ${s.addOption}`}
            onClick={() => openModal("employee")}
          >
            <AddIcon />
            დაამატე თანამშრომელი
          </li>
        )}
        {options.map((option) => (
          <li
            key={option.id}
            className={s.option}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
          >
            {mode === "priority" && (
              <Image
                src={option.icon || ""}
                alt={option.name}
                width={16}
                height={18}
              />
            )}
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
