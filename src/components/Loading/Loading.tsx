import s from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={s.loaderContainer}>
      <div className={s.spinner}></div>
    </div>
  );
}
