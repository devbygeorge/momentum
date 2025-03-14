import s from "./Input.module.css";

type TextareaProps = {
  type: "text" | "email";
};

export default function Input({ type }: TextareaProps) {
  return <input className={s.input} type={type} />;
}
