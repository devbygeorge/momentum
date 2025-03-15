import Comments from "./Comments";
import s from "./TaskDetails.module.css";
import Image from "next/image";
import PieChartIcon from "@/assets/icons/pie-chart.svg";
import UserIcon from "@/assets/icons/user.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import Select from "@/components/Select/Select";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { Option } from "@/components/Select/Select";
import { fetchTask } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils/dateUtils";

type TaskDetailsTypes = {
  taskId: string | string[] | undefined;
};

export default function TaskDetails({ taskId }: TaskDetailsTypes) {
  const { data: task, isLoading } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => fetchTask(taskId),
  });

  const { statuses } = useAppContext();
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [avatarSrc, setAvatarSrc] = useState("");

  const updateStatus = (option: Option) => {
    setSelectedStatus(option);
  };

  useEffect(() => {
    setSelectedStatus(task?.status);
  }, [task?.status]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className={s.wrapper}>
      {/* Details side */}
      <article>
        {/* Task Header */}
        <header className={s.header}>
          <div className={s.headerTop}>
            <div className={s.priority}>
              <Image
                src={task.priority.icon}
                alt={`${task.priority.name} priority`}
                width={18}
                height={20}
              />
              {task.priority.name}
            </div>
            <div className={s.department}>{task.department.name}</div>
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
                selected={selectedStatus}
                onChange={updateStatus}
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
            <dd>ორშ - {formatDate(task.due_date)}</dd>
          </dl>
        </section>
      </article>

      {/* Comments Side */}
      <aside className={s.aside}>
        <Comments />
      </aside>
    </div>
  );
}
