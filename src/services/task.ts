import { BASE_URL } from "./shared";

export type TaskId = string;

export const createTask = async function ({
  projectId,
  variables,
}: {
  projectId: string;
  variables: Record<string, string>;
}): Promise<TaskId> {
  const response = await fetch(`${BASE_URL}/projects/${projectId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      variables,
    }),
  });
  return response.json();
};

export const runSingleTask = async function ({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}): Promise<TaskId> {
  const response = await fetch(
    `${BASE_URL}/projects/${projectId}/tasks/${taskId}/run`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  return response.json();
};

export const runAllTasks = async function ({
  projectId,
}: {
  projectId: string;
}): Promise<TaskId> {
  const response = await fetch(
    `${BASE_URL}/projects/${projectId}/tasks/run?force=true`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  return response.json();
};

export const deleteTask = async function ({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}): Promise<void> {
  await fetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const updateTask = async function ({
  projectId,
  taskId,
  variables,
}: {
  projectId: string;
  taskId: string;
  variables: Record<string, string>;
}): Promise<void> {
  await fetch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      variables,
    }),
  });
};

export const uploadTaskByFile = async function ({
  projectId,
  file,
}: {
  projectId: string;
  file: File;
}): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);

  await fetch(`${BASE_URL}/projects/${projectId}/tasks/upload-file`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
};
