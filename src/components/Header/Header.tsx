import s from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";
import PlusIcon from "@/assets/icons/plus.svg";

export default function Header() {
  return (
    <header className={`${s.header} container`}>
      <div className={s.logo}>
        <Link href="/">
          <Image src="/logo.svg" alt="Momentum" fill />
        </Link>
      </div>
      <nav>
        <ul className={s.navList}>
          <li>
            <Button variant="outline" onClick={() => alert("Clicked!")}>
              თანამშრომლის შექმნა
            </Button>
          </li>
          <li>
            <Button variant="primary" href="/tasks/create">
              <PlusIcon /> შექმენი ახალი დავალება
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
