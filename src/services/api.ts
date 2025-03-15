import axios from "axios";

const API_BASE_URL = "https://momentum.redberryinternship.ge/api";
const PERSONAL_TOKEN = "9e6e252e-744a-4149-9fd3-6bb4a9e728c3";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${PERSONAL_TOKEN}`,
  },
});

// Fetch all statuses
export const fetchStatuses = async () => {
  const response = await api.get("/statuses");
  return response.data;
};

// Fetch all priorities
export const fetchPriorities = async () => {
  const response = await api.get("/priorities");
  return response.data;
};

// Fetch all departments
export const fetchDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};

// Fetch all employees
export const fetchEmployees = async () => {
  const response = await api.get("/employees");
  return response.data;
};

// Fetch all tasks
export const fetchTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

// Fetch single task
export const fetchTask = async (taskId: string | string[] | undefined) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

// Create a new employee
export const createEmployee = async (employeeData: {
  name: string;
  surname: string;
  avatar?: string;
  department_id: number;
}) => {
  const response = await api.post("/employees", employeeData);
  return response.data;
};

// Create a new task
export const createTask = async (taskData: {
  name: string;
  description: string;
  due_date: string;
  status_id: number;
  employee_id: number;
  priority_id: number;
}) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

// Change task status
export const updateTaskStatus = async (taskId: number, status_id: number) => {
  const response = await api.put(`/tasks/${taskId}`, { status_id });
  return response.data;
};
