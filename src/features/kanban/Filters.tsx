import styles from "./Filters.module.css";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";

import FiltersDropdown from "./FiltersDropdown";
import db from "@/db.json";

export default function Filters() {
  const { departments, priorities, employees } = db;

  return (
    <div className={styles.wrapper}>
      <ul className={styles.tabList}>
        <li className={styles.tabItem}>
          დეპარტამენტი
          <ArrowDownIcon className={styles.tabItemIcon} />
        </li>
        <li className={styles.tabItem}>
          პრიორიტეტი
          <ArrowDownIcon className={styles.tabItemIcon} />
        </li>
        <li className={styles.tabItem}>
          თანამშრომელი
          <ArrowDownIcon className={styles.tabItemIcon} />
        </li>
      </ul>

      <FiltersDropdown data={departments} />

      <FiltersDropdown data={priorities} />

      <FiltersDropdown data={employees} variant="employees" />
    </div>
  );
}
