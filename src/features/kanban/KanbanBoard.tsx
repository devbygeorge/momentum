import s from "./KanbanBoard.module.css";
import Column from "./Column";
import { useAppContext } from "@/context/AppContext";

export default function KanbanBoard() {
  const { statuses } = useAppContext();
  
  return (
    <div className={s.wrapper}>
      {statuses.map((status) => (
        <Column key={status.id} statusId={status.id} statusName={status.name} />
      ))}
    </div>
  );
}
