import { ReactNode } from "react";
import s from "./FormGroup.module.css";

type FormGroupProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
  minText?: string;
  maxText?: string;
  className?: string;
};

export default function FormGroup({
  label,
  htmlFor,
  children,
  minText,
  maxText,
  className,
}: FormGroupProps) {
  const FormGroupClass = [s.formGroup, className].filter(Boolean).join(" ");

  return (
    <div className={FormGroupClass}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {minText && <span className={s.formMinLabel}>{minText}</span>}
      {maxText && <span>{maxText}</span>}
    </div>
  );
}
