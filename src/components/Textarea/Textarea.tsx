import { Ref } from "react";
import s from "./Textarea.module.css";
import clsx from "clsx";

type TextareaProps = {
  placeholder?: string;
  design?: "default" | "light";
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  hasBottomSpace?: boolean;
  ref?: Ref<HTMLTextAreaElement> | undefined;
};

export default function Textarea({
  placeholder,
  design,
  value,
  onChange,
  hasError,
  hasBottomSpace,
  ref,
}: TextareaProps) {
  return (
    <div
      className={clsx(s.wrapper, {
        [s.light]: design === "light",
        [s.error]: hasError,
      })}
    >
      <textarea
        className={clsx(s.textarea, {
          [s.bottomSpace]: hasBottomSpace,
        })}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={ref}
      />
    </div>
  );
}
