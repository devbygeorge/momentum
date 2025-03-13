import s from "./Textarea.module.css";

type TextareaProps = {
  placeholder?: string;
  name: string;
};

export default function Textarea({ placeholder, name }: TextareaProps) {
  return (
    <textarea className={s.textarea} placeholder={placeholder} name={name} />
  );
}
