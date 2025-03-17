import clsx from "clsx";
import s from "./Input.module.css";

type InputProps = {
  type: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
};

export default function Input({ type, value, onChange, hasError }: InputProps) {
  return (
    <input
      className={clsx(s.input, { [s.error]: hasError })}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
