import s from "./Filters.module.css";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import CloseIcon from "@/assets/icons/close.svg";

// import FiltersDropdown from "./FiltersDropdown";
// import db from "@/db.json";

export default function Filters() {
  // const { departments, priorities, employees } = db;

  return (
    <div className={s.wrapper}>
      <ul className={s.tabList}>
        <li className={s.tabItem}>
          დეპარტამენტი
          <ArrowDownIcon className={s.tabItemIcon} />
        </li>
        <li className={s.tabItem}>
          პრიორიტეტი
          <ArrowDownIcon className={s.tabItemIcon} />
        </li>
        <li className={s.tabItem}>
          თანამშრომელი
          <ArrowDownIcon className={s.tabItemIcon} />
        </li>
      </ul>

      {/* <FiltersDropdown data={departments} /> */}

      {/* <FiltersDropdown data={priorities} /> */}

      {/* <FiltersDropdown data={employees} variant="employees" /> */}

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
