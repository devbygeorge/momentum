import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchStatuses,
  fetchPriorities,
  fetchDepartments,
  fetchEmployees,
} from "@/services/api";

// Define the shape of the context data
type AppContextType = {
  statuses: { id: number; name: string }[];
  priorities: { id: number; name: string; icon: string }[];
  departments: { id: number; name: string }[];
  employees: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department_id: number;
  }[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: statuses = [],
    error: statusError,
    refetch: refetchStatuses,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const {
    data: priorities = [],
    error: priorityError,
    refetch: refetchPriorities,
  } = useQuery({
    queryKey: ["priorities"],
    queryFn: fetchPriorities,
  });

  const {
    data: departments = [],
    error: departmentError,
    refetch: refetchDepartments,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const {
    data: employees = [],
    error: employeeError,
    refetch: refetchEmployees,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const loading = !statuses || !priorities || !departments || !employees;
  const error =
    statusError || priorityError || departmentError || employeeError
      ? "Failed to fetch data"
      : null;

  const refetch = () => {
    refetchStatuses();
    refetchPriorities();
    refetchDepartments();
    refetchEmployees();
  };

  return (
    <AppContext.Provider
      value={{
        statuses,
        priorities,
        departments,
        employees,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook for using context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
