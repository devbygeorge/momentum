import s from "./Textarea.module.css";

type TextareaProps = {
  placeholder?: string;
  design?: "default" | "light";
};

export default function Textarea({ placeholder, design }: TextareaProps) {
  return (
    <textarea
      className={`${s.textarea} ${design === "light" ? s.light : ""}`}
      placeholder={placeholder}
    />
  );
}
