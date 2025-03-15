import { ReactNode } from "react";
import s from "./FormGroup.module.css";

type FormGroupProps = {
  label: string;
  children: ReactNode;
  className?: string;
  minText?: string;
  maxText?: string;
  validate?: boolean;
  minError?: boolean;
  maxError?: boolean;
};

export default function FormGroup({
  label,
  children,
  className,
  minText,
  maxText,
  validate,
  minError,
  maxError,
}: FormGroupProps) {
  const FormGroupClass = [s.formGroup, className].filter(Boolean).join(" ");

  const minCondition =
    validate && minError ? "error" : validate ? "success" : "";

  const maxCondition =
    validate && maxError ? "error" : validate ? "success" : "";

  return (
    <div className={FormGroupClass}>
      <label className={s.formLabel}>{label}</label>
      {children}
      {minText && (
        <span className={`${s.formSpan} ${s.formMinLabel} ${s[minCondition]}`}>
          {minText}
        </span>
      )}
      {maxText && (
        <span className={`${s.formSpan} ${s[maxCondition]}`}>{maxText}</span>
      )}
    </div>
  );
}
