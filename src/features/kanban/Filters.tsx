import styles from "./Filters.module.css";
import ArrowDown from "@/assets/icons/arrow-down.svg";

export default function Filters() {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.tabList}>
        <li className={styles.tabItem}>
          დეპარტამენტი
          <ArrowDown className={styles.tabItemIcon} />
        </li>
        <li className={styles.tabItem}>
          პრიორიტეტი
          <ArrowDown className={styles.tabItemIcon} />
        </li>
        <li className={styles.tabItem}>
          თანამშრომელი
          <ArrowDown className={styles.tabItemIcon} />
        </li>
      </ul>
    </div>
  );
}
