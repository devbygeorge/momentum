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
      className={`${s.input} ${hasError ? s.error : ""}`}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
