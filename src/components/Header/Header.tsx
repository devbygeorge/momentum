import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";

export default function Header() {
  return (
    <header className={`${styles.header} container`}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.svg" alt="Momentum" layout="fill" />
        </Link>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Button variant="outline" onClick={() => alert("Clicked!")}>
              თანამშრომლის შექმნა
            </Button>
          </li>
          <li>
            <Button variant="primary" href="/tasks/create">
              + შექმენი ახალი დავალება
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
