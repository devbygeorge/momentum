import { createContext, useContext, useEffect, useState } from "react";
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
  refreshData: () => void;
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context Provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statusesData, prioritiesData, departmentsData, employeesData] =
        await Promise.all([
          fetchStatuses(),
          fetchPriorities(),
          fetchDepartments(),
          fetchEmployees(),
        ]);
      setStatuses(statusesData);
      setPriorities(prioritiesData);
      setDepartments(departmentsData);
      setEmployees(employeesData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        statuses,
        priorities,
        departments,
        employees,
        loading,
        error,
        refreshData: fetchData,
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
