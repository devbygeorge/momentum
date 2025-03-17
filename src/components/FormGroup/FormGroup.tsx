import { ReactNode } from "react";
import s from "./FormGroup.module.css";
import clsx from "clsx";

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
  const FormGroupClass = clsx(s.formGroup, className);

  const minCondition = validate ? (minError ? "error" : "success") : "";
  const maxCondition = validate ? (maxError ? "error" : "success") : "";

  return (
    <div className={FormGroupClass}>
      <label className={s.formLabel}>{label}</label>
      {children}
      {minText && (
        <span className={clsx(s.formSpan, s.formMinLabel, s[minCondition])}>
          {minText}
        </span>
      )}
      {maxText && (
        <span className={clsx(s.formSpan, s[maxCondition])}>{maxText}</span>
      )}
    </div>
  );
}
