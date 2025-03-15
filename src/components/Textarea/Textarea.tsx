import { Ref } from "react";
import s from "./Textarea.module.css";

type TextareaProps = {
  placeholder?: string;
  design?: "default" | "light";
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  ref?: Ref<HTMLTextAreaElement> | undefined;
};

export default function Textarea({
  placeholder,
  design,
  value,
  onChange,
  hasError,
  ref,
}: TextareaProps) {
  return (
    <textarea
      className={`${s.textarea} ${design === "light" ? s.light : ""} ${
        hasError ? s.error : ""
      }`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      ref={ref}
    />
  );
}
