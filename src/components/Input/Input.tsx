import s from "./Input.module.css";

type TextareaProps = {
  type: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
};

export default function Input({
  type,
  value,
  onChange,
  hasError,
}: TextareaProps) {
  return (
    <input
      className={`${s.input} ${hasError ? s.error : ""}`}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
