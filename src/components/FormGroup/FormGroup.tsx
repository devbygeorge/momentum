import { ReactNode } from "react";
import s from "./FormGroup.module.css";

type FormGroupProps = {
  label: string;
  children: ReactNode;
  minText?: string;
  maxText?: string;
  className?: string;
};

export default function FormGroup({
  label,
  children,
  minText,
  maxText,
  className,
}: FormGroupProps) {
  const FormGroupClass = [s.formGroup, className].filter(Boolean).join(" ");

  return (
    <div className={FormGroupClass}>
      <label className={s.formLabel}>{label}</label>
      {children}
      {minText && (
        <span className={`${s.formSpan} ${s.formMinLabel}`}>{minText}</span>
      )}
      {maxText && <span className={s.formSpan}>{maxText}</span>}
    </div>
  );
}
