import styles from "./KanbanBoard.module.css";
import Column from "./Column";
import db from "@/db.json";

export default function KanbanBoard() {
  const { statuses } = db;

  return (
    <div className={styles.wrapper}>
      {statuses.map((status) => (
        <Column key={status.id} statusId={status.id} statusName={status.name} />
      ))}
    </div>
  );
}
