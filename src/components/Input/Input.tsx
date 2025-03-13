import s from "./Input.module.css";

type TextareaProps = {
  type: "text" | "email";
  name: string;
  required?: boolean;
};

export default function Input({ type, name, required }: TextareaProps) {
  return (
    <input className={s.input} type={type} name={name} required={required} />
  );
}
