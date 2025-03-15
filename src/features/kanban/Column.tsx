import { Task } from "@/types";
import s from "./Column.module.css";
import TaskCard from "./TaskCard";

type ColumnProps = {
  statusId: number;
  statusName: string;
  tasks: Task[];
};

export default function Column({ statusId, statusName, tasks }: ColumnProps) {
  return (
    <div className={s.wrapper}>
      <h2 className={`${s.heading} ${s[`status-${statusId}`]}`}>
        {statusName}
      </h2>

      <div className={s.list}>
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
