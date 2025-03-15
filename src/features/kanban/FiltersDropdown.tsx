import s from "./FiltersDropdown.module.css";
import Button from "@/components/Button/Button";
import CheckboxDefaultIcon from "@/assets/icons/checkbox-default.svg";
// import CheckboxActiveIcon from "@/assets/icons/checkbox-active.svg";
import Image from "next/image";

type FiltersDropdownProps = {
  variant?: "primary" | "employees";
  onClick?: () => void;
  selectMode: "single" | "multi";
  data: {
    id: number;
    name: string;
    surname?: string;
    avatar?: string;
    department?: {
      id?: number;
    };
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
                <Image
                  className={s.dropdownEmployeeAvatar}
                  src={item.avatar || ""}
                  alt="Employee Picture"
                  width={28}
                  height={28}
                />
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
