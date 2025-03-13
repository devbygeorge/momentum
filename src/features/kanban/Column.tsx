import s from "./Column.module.css";
import TaskCard from "./TaskCard";

type ColumnProps = {
  statusId: number;
  statusName: string;
};

export default function Column({ statusId, statusName }: ColumnProps) {
  return (
    <div className={s.wrapper}>
      <h2 className={`${s.heading} ${s[`status-${statusId}`]}`}>
        {statusName}
      </h2>

      <div className={s.list}>
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  );
}
