import { Task } from "@/types";
import s from "./Column.module.css";
import TaskCard from "./TaskCard";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";

type ColumnProps = {
  statusName: string;
  tasks: Task[];
  accentColor: string | undefined;
};

export default function Column({
  statusName,
  tasks,
  accentColor,
}: ColumnProps) {
  return (
    <div className={s.wrapper}>
      <h2 style={{ backgroundColor: accentColor }} className={s.heading}>
        {statusName}
      </h2>
      <SimpleBar className={s.listWrapper}>
        <div className={s.list}>
          {tasks?.map((task) => (
            <TaskCard key={task.id} task={task} accentColor={accentColor} />
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}
