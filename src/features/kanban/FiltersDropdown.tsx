import s from "./FiltersDropdown.module.css";
import Button from "@/components/Button/Button";
import CheckboxActiveIcon from "@/assets/icons/checkbox-active.svg";
import CheckboxDefaultIcon from "@/assets/icons/checkbox-default.svg";
import Image from "next/image";
import { SelectOption } from "@/types";

type FiltersDropdownProps = {
  type: "departments" | "priorities" | "employees";
  data: SelectOption[];
  selected: Set<string> | string[];
  onSelect: (
    type: "departments" | "priorities" | "employees",
    id: string
  ) => void;
  onApply: () => void;
};

export default function FiltersDropdown({
  type,
  data,
  selected,
  onSelect,
  onApply,
}: FiltersDropdownProps) {
  return (
    <div className={s.dropdownWrapper}>
      <ul className={s.dropdownList}>
        {data.map((item) => (
          <li
            key={item.id}
            className={s.dropdownItem}
            onClick={() => onSelect(type, item.id.toString())}
          >
            {(
              selected instanceof Set
                ? selected.has(item.id.toString())
                : selected.includes(item.id.toString())
            ) ? (
              <CheckboxActiveIcon
                className={type !== "departments" ? s.svgPurple : ""}
              />
            ) : (
              <CheckboxDefaultIcon
                className={type !== "departments" ? s.svgPurple : ""}
              />
            )}

            {type === "employees" ? (
              <div className={s.dropdownEmployeeWrapper}>
                <Image
                  className={s.dropdownEmployeeAvatar}
                  src={item.avatar || ""}
                  alt="Employee"
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
        <Button variant="secondary" onClick={onApply}>
          არჩევა
        </Button>
      </div>
    </div>
  );
}
