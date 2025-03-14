import Comments from "./Comments";
import s from "./TaskDetails.module.css";
import db from "@/db.json";
import Image from "next/image";
import PieChartIcon from "@/assets/icons/pie-chart.svg";
import UserIcon from "@/assets/icons/user.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import Select from "@/components/Select/Select";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import { Option } from "@/components/Select/Select";

export default function TaskDetails() {
  const task = db.tasks[0];
  const { statuses } = useAppContext();
  const [selectedStatus, setSelectedStatus] = useState<Option>(task.status);

  const updateStatus = (option: Option) => {
    setSelectedStatus(option);
  };

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
              <div className={s.employeeAvatarWrapper}>
                <Image src={task.employee.avatar} alt="Employee Avatar" fill />
              </div>

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
            <dd>ორშ - {task.due_date.replace(/-/g, "/")}</dd>
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
