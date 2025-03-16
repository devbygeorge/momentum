import Image from "next/image";
import s from "./TaskCard.module.css";
import CommentsIcon from "@/assets/icons/comments.svg";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/dateUtils";
import { truncateText } from "@/utils/stringUtils";
import Link from "next/link";
import { Task } from "@/types";
import { PRIORITY_COLORS, RANDOM_COLORS } from "@/constants";
import { getRandomColor } from "@/utils/colorUtils";

type TaskCardProps = {
  task: Task;
  accentColor: string | undefined;
};

export default function TaskCard({ task, accentColor }: TaskCardProps) {
  const [formattedDate, setFormattedDate] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("");

  useEffect(() => {
    setFormattedDate(formatDate(task.due_date));
  }, [task.due_date]);

  const randomColor = getRandomColor(RANDOM_COLORS);

  const priorityColor = PRIORITY_COLORS.find(
    (item) => item.id === task.priority.id
  )?.color;

  return (
    <Link
      style={{ borderColor: accentColor }}
      className={s.wrapper}
      href={`/tasks/${task.id}`}
    >
      <header className={s.header}>
        <div
          style={{ borderColor: priorityColor, color: priorityColor }}
          className={s.priority}
        >
          <Image
            src={task.priority.icon}
            alt={`${task.priority.name} priority`}
            width={16}
            height={18}
          />
          {task.priority.name}
        </div>

        <div style={{ backgroundColor: randomColor }} className={s.department}>
          {truncateText(task.department.name || "", 10)}
        </div>

        <time className={s.dueDate} dateTime={task.due_date}>
          {formattedDate}
        </time>
      </header>

      <section className={s.main}>
        <h3 className={s.name}>{task.name}</h3>
        <p className={s.description}>
          {truncateText(task.description || "", 100)}
        </p>
      </section>

      <footer className={s.footer}>
        <Image
          className={s.avatar}
          src={avatarSrc || task.employee.avatar}
          alt="Employee Avatar"
          width={31}
          height={31}
          onError={() => setAvatarSrc("/avatar-placeholder.png")}
        />

        <div className={s.totalComments}>
          <CommentsIcon />
          {task.total_comments}
        </div>
      </footer>
    </Link>
  );
}
