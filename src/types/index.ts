export type Status = {
  id: number;
  name: string;
};

export type Department = {
  id: number;
  name: string;
};

export type Priority = {
  id: number;
  name: string;
  icon: string;
};

export type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: number;
};

export type Comment = {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments?: Comment[];
};

export type Task = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: {
    id: number;
    name: string;
  };
  employee: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department: {
      id: number;
      name: string;
    };
  };
  status: {
    id: number;
    name: string;
  };
  priority: {
    id: number;
    name: string;
    icon: string;
  };
  total_comments: number;
};
