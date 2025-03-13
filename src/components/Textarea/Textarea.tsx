import s from "./Textarea.module.css";

type TextareaProps = {
  placeholder: string;
};

export default function Textarea({ placeholder }: TextareaProps) {
  return <textarea className={s.textarea} placeholder={placeholder} />;
}
