import s from "./KanbanBoard.module.css";
import Column from "./Column";
import { useAppContext } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/services/api";
import { Task } from "@/types";
import { useSearchParams } from "next/navigation";
import { STATUS_COLORS } from "@/constants";

export default function KanbanBoard() {
  const { statuses } = useAppContext();
  const searchParams = useSearchParams();

  // Extract filters from URL
  const selectedDepartments = new Set(
    searchParams.get("departments")?.split(",") || []
  );
  const selectedPriorities = new Set(
    searchParams.get("priorities")?.split(",") || []
  );
  const selectedEmployee = searchParams.get("employees") || null;

  // Fetch tasks
  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <div>Loading...</div>;

  // Function to check if a task matches selected filters
  const isTaskMatchingFilters = (task: Task) => {
    return (
      (selectedDepartments.size === 0 ||
        selectedDepartments.has(task.department.id.toString())) &&
      (selectedPriorities.size === 0 ||
        selectedPriorities.has(task.priority.id.toString())) &&
      (!selectedEmployee || task.employee.id.toString() === selectedEmployee)
    );
  };

  return (
    <div className={s.wrapper}>
      {statuses.map((status) => {
        // Filter tasks based on status & selected filters
        const filteredTasks = tasks
          .filter((task) => task.status.id === status.id)
          .filter(isTaskMatchingFilters);

        const accentColor = STATUS_COLORS.find(
          (item) => item.id === status.id
        )?.color;

        return (
          <Column
            key={status.id}
            statusName={status.name}
            tasks={filteredTasks}
            accentColor={accentColor}
          />
        );
      })}
    </div>
  );
}
