import type { Project } from "@/types";
import { BASE_URL } from "./shared";

const decoder = new TextDecoder();

const getProjects = async () => {
  const response = await fetch(`${BASE_URL}/projects`, {
    credentials: "include",
  });
  return response.json();
};

const getProject = async (id: string): Promise<Project> => {
  const response = await fetch(`${BASE_URL}/projects/${id}`, {
    credentials: "include",
  });
  return response.json();
};

const createProject = async (project: Partial<Project>): Promise<Project> => {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  return response.json();
};

const updateProject = async function (
  project: Partial<Project>
): Promise<Project> {
  const response = await fetch(`${BASE_URL}/projects/${project.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: project.name,
      description: project.description,
      prompt: project.prompt,
      variables: project.variables,
      visibility: project.visibility,
    }),
    credentials: "include",
  });

  return response.json();
};

const deleteProject = async function (id: string) {
  const response = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

const generateProjectAnswer = async function* ({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/projects/${id}/completion`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.body) {
      console.error("ReadableStream not supported or response body is null");
      return;
    }

    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const parsed = decoder
        .decode(value)
        .split("\n\n")
        .filter((v) => v)
        .map((value) => JSON.parse(value.slice(value.indexOf("data:") + 6)));

      for (const { choices } of parsed)
        for (const { delta } of choices) yield delta?.content ?? "";
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  generateProjectAnswer,
};
