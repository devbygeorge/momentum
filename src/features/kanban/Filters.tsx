"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import s from "./Filters.module.css";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import FiltersDropdown from "./FiltersDropdown";
import { useAppContext } from "@/context/AppContext";

type DropdownType = "departments" | "priorities" | "employees";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { departments, priorities, employees } = useAppContext();

  const [activeDropdown, setActiveDropdown] = useState<DropdownType | null>(
    null
  );
  const [selectedFilters, setSelectedFilters] = useState({
    departments: new Set<string>(),
    priorities: new Set<string>(),
    employees: [] as string[],
  });

  useEffect(() => {
    setSelectedFilters({
      departments: new Set(searchParams.get("departments")?.split(",") || []),
      priorities: new Set(searchParams.get("priorities")?.split(",") || []),
      employees: searchParams.get("employees")
        ? [searchParams.get("employees")!]
        : [],
    });
  }, [searchParams]);

  const toggleDropdown = (type: DropdownType) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  const handleSelect = (type: DropdownType, id: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (type === "employees") {
        updatedFilters[type] = prevFilters.employees.includes(id) ? [] : [id];
      } else {
        const newSet = new Set(prevFilters[type]);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        updatedFilters[type] = newSet;
      }

      return updatedFilters;
    });
  };

  const applyFilters = () => {
    const query = new URLSearchParams();

    if (selectedFilters.departments.size) {
      query.set(
        "departments",
        Array.from(selectedFilters.departments).join(",")
      );
    }
    if (selectedFilters.priorities.size) {
      query.set("priorities", Array.from(selectedFilters.priorities).join(","));
    }
    if (selectedFilters.employees.length) {
      query.set("employees", selectedFilters.employees[0]);
    }

    router.push(`/?${query.toString()}`);
    setActiveDropdown(null);
  };

  return (
    <div className={s.wrapper}>
      <ul className={s.tabList}>
        {["departments", "priorities", "employees"].map((type) => (
          <li
            key={type}
            className={s.tabItem}
            onClick={() => toggleDropdown(type as DropdownType)}
          >
            {type === "departments"
              ? "დეპარტამენტი"
              : type === "priorities"
              ? "პრიორიტეტი"
              : "თანამშრომელი"}
            <ArrowDownIcon />
          </li>
        ))}
      </ul>

      {activeDropdown && (
        <FiltersDropdown
          type={activeDropdown}
          data={{ departments, priorities, employees }[activeDropdown]}
          selected={selectedFilters[activeDropdown]}
          onSelect={handleSelect}
          onApply={applyFilters}
        />
      )}
    </div>
  );
}
