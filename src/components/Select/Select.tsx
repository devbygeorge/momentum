import s from "./Select.module.css";

type SelectProps = {
  name: string;
  required?: boolean;
};

export default function Select({ name, required }: SelectProps) {
  console.log(name, required);
  return <div className={s.wrapper}>Component</div>;
}
