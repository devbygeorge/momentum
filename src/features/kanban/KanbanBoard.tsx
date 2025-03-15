import s from "./KanbanBoard.module.css";
import Column from "./Column";
import { useAppContext } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/services/api";
import { Task } from "@/types";

export default function KanbanBoard() {
  const { statuses } = useAppContext();

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={s.wrapper}>
      {statuses.map((status) => {
        const filteredTasks = tasks.filter(
          (task) => task.status.id === status.id
        );

        return (
          <Column
            key={status.id}
            statusId={status.id}
            statusName={status.name}
            tasks={filteredTasks}
          />
        );
      })}
    </div>
  );
}
