import Image from "next/image";
import s from "./TaskCard.module.css";
import db from "@/db.json";
import CommentsIcon from "@/assets/icons/comments.svg";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/dateUtils";
import { truncateText } from "@/utils/stringUtils";
import Link from "next/link";

export default function TaskCard() {
  const [formattedDate, setFormattedDate] = useState("");

  const task = db.tasks[0];

  useEffect(() => {
    setFormattedDate(formatDate(task.due_date));
  }, [task.due_date]);

  return (
    <Link className={s.wrapper} href={`/tasks/${task.id}`}>
      <header className={s.header}>
        <div className={s.priority}>
          <Image
            src={task.priority.icon}
            alt={`${task.priority.name} priority`}
            width={16}
            height={18}
          />
          {task.priority.name}
        </div>

        <div className={s.department}>{task.department.name}</div>

        <time className={s.dueDate} dateTime={task.due_date}>
          {formattedDate}
        </time>
      </header>

      <section className={s.main}>
        <h3 className={s.name}>{task.name}</h3>
        <p className={s.description}>{truncateText(task.description, 100)}</p>
      </section>

      <footer className={s.footer}>
        <div className={s.avatarWrapper}>
          <Image src={task.employee.avatar} alt="Employee Avatar" fill />
        </div>

        <div className={s.totalComments}>
          <CommentsIcon />
          {task.total_comments}
        </div>
      </footer>
    </Link>
  );
}
