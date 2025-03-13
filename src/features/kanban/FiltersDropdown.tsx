import s from "./FiltersDropdown.module.css";
import Button from "@/components/Button/Button";
import CheckboxDefaultIcon from "@/assets/icons/checkbox-default.svg";
// import CheckboxActiveIcon from "@/assets/icons/checkbox-active.svg";
import Image from "next/image";

type FiltersDropdownProps = {
  variant?: "primary" | "employees";
  onClick?: () => void;
  data: {
    id: number;
    name: string;
    surname?: string;
    avatar?: string;
    department_id?: number;
    icon?: string;
  }[];
};

export default function FiltersDropdown({
  variant,
  onClick,
  data,
}: FiltersDropdownProps) {
  return (
    <div className={s.dropdownWrapper}>
      <ul className={s.dropdownList}>
        {data?.map((item) => (
          <li key={item.id} className={s.dropdownItem}>
            <CheckboxDefaultIcon />
            {variant === "employees" ? (
              <div className={s.dropdownEmployeeWrapper}>
                <div className={s.dropdownEmployeeAvatar}>
                  <Image src={item.avatar || ""} alt="Employee Picture" fill />
                </div>
                {item.name} {item.surname}
              </div>
            ) : (
              item.name
            )}
          </li>
        ))}
      </ul>

      <div className={s.dropdownButton}>
        <Button variant="secondary" onClick={onClick}>
          არჩევა
        </Button>
      </div>
    </div>
  );
}
