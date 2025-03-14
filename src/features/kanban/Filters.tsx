import s from "./Filters.module.css";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import CloseIcon from "@/assets/icons/close.svg";
import { useAppContext } from "@/context/AppContext";

import FiltersDropdown from "./FiltersDropdown";
import { useState } from "react";

type DropdownType = "departments" | "priorities" | "employees";

export default function Filters() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType | null>(
    null
  );

  const { departments, priorities, employees } = useAppContext();

  const toggleDropdown = (type: DropdownType) => {
    setActiveDropdown((prevState) => (prevState === type ? null : type));
  };

  return (
    <div className={s.wrapper}>
      <ul className={s.tabList}>
        <li className={s.tabItem} onClick={() => toggleDropdown("departments")}>
          დეპარტამენტი
          <ArrowDownIcon className={s.tabItemIcon} />
        </li>
        <li className={s.tabItem} onClick={() => toggleDropdown("priorities")}>
          პრიორიტეტი
          <ArrowDownIcon className={s.tabItemIcon} />
        </li>
        <li className={s.tabItem} onClick={() => toggleDropdown("employees")}>
          თანამშრომელი
          <ArrowDownIcon className={s.tabItemIcon} />
        </li>
      </ul>

      {activeDropdown === "departments" && (
        <FiltersDropdown data={departments} selectMode="single" />
      )}

      {activeDropdown === "priorities" && (
        <FiltersDropdown data={priorities} selectMode="multi" />
      )}

      {activeDropdown === "employees" && (
        <FiltersDropdown
          data={employees}
          selectMode="multi"
          variant="employees"
        />
      )}

      <div className={s.chosenWrapper}>
        <ul className={s.chosenList}>
          <li className={s.chosenItem}>
            მაღალი
            <CloseIcon />
          </li>
          <li className={s.chosenItem}>
            დიზაინი
            <CloseIcon />
          </li>
          <li className={s.chosenItem}>
            ემილია მორგანი
            <CloseIcon />
          </li>
        </ul>
        <span className={s.chosenClear}>გასუფთავება</span>
      </div>
    </div>
  );
}
