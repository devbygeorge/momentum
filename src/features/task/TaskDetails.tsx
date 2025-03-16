import Comments from "./Comments";
import s from "./TaskDetails.module.css";
import Image from "next/image";
import PieChartIcon from "@/assets/icons/pie-chart.svg";
import UserIcon from "@/assets/icons/user.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import Select from "@/components/Select/Select";
import { useAppContext } from "@/context/AppContext";
import { useMemo, useState } from "react";
import { fetchTask, updateTaskStatus } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/utils/dateUtils";
import { Task } from "@/types";
import { getRandomColor } from "@/utils/colorUtils";
import { PRIORITY_COLORS, RANDOM_COLORS } from "@/constants";
import Loading from "@/components/Loading/Loading";

type TaskDetailsTypes = {
  taskId: number;
};

export default function TaskDetails({ taskId }: TaskDetailsTypes) {
  const { statuses } = useAppContext();
  const [avatarSrc, setAvatarSrc] = useState("");

  const queryClient = useQueryClient();

  const { data: task, isLoading } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => fetchTask(taskId),
  });

  const { mutate: changeTaskStatus } = useMutation({
    mutationFn: (newStatusId: number) => updateTaskStatus(taskId, newStatusId),
    onSuccess: (data) => {
      queryClient.setQueryData(["task", taskId], (oldTask: Task) =>
        oldTask ? { ...oldTask, status: data.status } : oldTask
      );

      queryClient.setQueryData(["tasks"], (oldTasks: Task[]) => {
        return oldTasks?.map((task) =>
          task.id === taskId ? { ...task, status: data.status } : task
        );
      });

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const randomColor = useMemo(() => getRandomColor(RANDOM_COLORS), []);

  if (isLoading) return <Loading />;

  const priorityColor = PRIORITY_COLORS.find(
    (item) => item.id === task.priority.id
  )?.color;

  return (
    <div className={s.wrapper}>
      {/* Details side */}
      <article>
        {/* Task Header */}
        <header className={s.header}>
          <div className={s.headerTop}>
            <div
              style={{ borderColor: priorityColor, color: priorityColor }}
              className={s.priority}
            >
              <Image
                src={task.priority.icon}
                alt={`${task.priority.name} priority`}
                width={18}
                height={20}
              />
              {task.priority.name}
            </div>
            <div
              style={{ backgroundColor: randomColor }}
              className={s.department}
            >
              {task.department.name}
            </div>
          </div>
          <h1 className={s.heading}>{task.name}</h1>
          <p className={s.description}>{task.description}</p>
        </header>

        {/* Task Details */}
        <section>
          <h2 className={s.subheading}>დავალების დეტალები</h2>
          <dl className={s.detailsGrid}>
            <dt>
              <PieChartIcon />
              სტატუსი
            </dt>
            <dd>
              <Select
                options={statuses}
                selected={task?.status} // Deriving status directly from task
                onChange={(option) => changeTaskStatus(option.id)}
              />
            </dd>

            <dt>
              <UserIcon />
              თანამშრომელი
            </dt>
            <dd className={s.employeeWrapper}>
              <Image
                className={s.employeeAvatar}
                src={avatarSrc || task.employee.avatar}
                alt="Employee Avatar"
                width={32}
                height={32}
                onError={() => setAvatarSrc("/avatar-placeholder.png")}
              />
              <span className={s.employeeDepartment}>
                {task.department.name}
              </span>
              <span className={s.employeeName}>
                {task.employee.name} {task.employee.surname}
              </span>
            </dd>

            <dt>
              <CalendarIcon />
              დავალების ვადა
            </dt>
            <dd>{formatDate(task.due_date)}</dd>
          </dl>
        </section>
      </article>

      {/* Comments Side */}
      <aside className={s.aside}>
        <Comments taskId={taskId} />
      </aside>
    </div>
  );
}
