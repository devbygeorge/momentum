"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import s from "./Filters.module.css";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import CloseIcon from "@/assets/icons/close.svg";
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

  // Filters that are currently selected by the user
  const [selectedFilters, setSelectedFilters] = useState({
    departments: new Set<string>(),
    priorities: new Set<string>(),
    employees: [] as string[],
  });

  // Filters that are actually applied and reflected in the URL
  const [appliedFilters, setAppliedFilters] = useState({
    departments: new Set<string>(),
    priorities: new Set<string>(),
    employees: [] as string[],
  });

  // Load filters from URL on component mount
  useEffect(() => {
    setSelectedFilters({
      departments: new Set(searchParams.get("departments")?.split(",") || []),
      priorities: new Set(searchParams.get("priorities")?.split(",") || []),
      employees: searchParams.get("employees")
        ? [searchParams.get("employees")!]
        : [],
    });

    setAppliedFilters({
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

  const applyFilters = (filters = selectedFilters) => {
    setAppliedFilters(filters);

    const query = new URLSearchParams();

    if (filters.departments.size) {
      query.set("departments", Array.from(filters.departments).join(","));
    }
    if (filters.priorities.size) {
      query.set("priorities", Array.from(filters.priorities).join(","));
    }
    if (filters.employees.length) {
      query.set("employees", filters.employees[0]);
    }

    router.push(`/?${query.toString()}`);
    setActiveDropdown(null);
  };
  
  const clearFilter = (type: DropdownType, id?: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters: {
        departments: Set<string>;
        priorities: Set<string>;
        employees: string[];
      } = {
        departments: new Set(prevFilters.departments),
        priorities: new Set(prevFilters.priorities),
        employees: [...prevFilters.employees],
      };

      if (id) {
        if (type === "employees") {
          updatedFilters.employees = prevFilters.employees.filter(
            (emp) => emp !== id
          );
        } else {
          updatedFilters[type].delete(id);
        }
      } else {
        // Clear all filters of this type
        if (type === "employees") {
          updatedFilters.employees = [];
        } else {
          updatedFilters[type] = new Set();
        }
      }

      applyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  const clearAllFilters = () => {
    setAppliedFilters({
      departments: new Set(),
      priorities: new Set(),
      employees: [],
    });

    router.replace("/");
  };

  return (
    <div className={s.wrapper}>
      <ul className={s.tabList}>
        {["departments", "priorities", "employees"].map((type) => (
          <li
            key={type}
            className={`${s.tabItem} ${
              activeDropdown === type ? s.active : null
            }`}
            onClick={() => toggleDropdown(type as DropdownType)}
          >
            {type === "departments"
              ? "დეპარტამენტი"
              : type === "priorities"
              ? "პრიორიტეტი"
              : "თანამშრომელი"}
            <ArrowDownIcon className={s.tabItemIcon} />
          </li>
        ))}
      </ul>

      {activeDropdown && (
        <FiltersDropdown
          type={activeDropdown}
          data={{ departments, priorities, employees }[activeDropdown]}
          selected={selectedFilters[activeDropdown]}
          onSelect={handleSelect}
          onApply={() => applyFilters()}
        />
      )}

      {/* Chosen Filters List */}
      <div
        style={{
          visibility:
            appliedFilters.departments.size > 0 ||
            appliedFilters.priorities.size > 0 ||
            appliedFilters.employees.length > 0
              ? "visible"
              : "hidden",
        }}
        className={s.chosenFilters}
      >
        {Array.from(appliedFilters.departments).map((filter) => (
          <span
            key={filter}
            className={s.filterBadge}
            onClick={() => clearFilter("departments", filter)}
          >
            {departments.find((d) => d.id.toString() === filter)?.name}
            <CloseIcon />
          </span>
        ))}

        {Array.from(appliedFilters.priorities).map((filter) => (
          <span
            key={filter}
            className={s.filterBadge}
            onClick={() => clearFilter("priorities", filter)}
          >
            {priorities.find((p) => p.id.toString() === filter)?.name}
            <CloseIcon />
          </span>
        ))}

        {appliedFilters.employees.map((filter) => (
          <span
            key={filter}
            className={s.filterBadge}
            onClick={() => clearFilter("employees", filter)}
          >
            {employees.find((e) => e.id?.toString() === filter)?.name}
            <CloseIcon />
          </span>
        ))}

        <button className={s.clearAll} onClick={clearAllFilters}>
          გასუფთავება
        </button>
      </div>
    </div>
  );
}
