import s from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";
import PlusIcon from "@/assets/icons/plus.svg";
import { useState } from "react";
import EmployeeModal from "@/features/modals/EmployeeModal";

export default function Header() {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

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
            <Button
              variant="outline"
              onClick={() => setIsEmployeeModalOpen(true)}
            >
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

      <EmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
      />
    </header>
  );
}
