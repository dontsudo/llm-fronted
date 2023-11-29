export type Project = {
  id: string;
  name: string;
  description: string;
  prompt: string;
  variables: string[];
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  projectId: string;
  status: string;
  variables: Record<string, string>;
  result: string;
  createdAt: string;
  updatedAt: string;
};

export type Pagination<T> = {
  data: T[];
  total: string;
  hasMore: boolean;
};
