import { BASE_URL } from "./shared";

export const getAllPublicProjects = async function () {
  const response = await fetch(`${BASE_URL}/community`, {
    credentials: "include",
  });

  return response.json();
};

export const forkPublicProject = async function (projectId: string) {
  const response = await fetch(`${BASE_URL}/community/${projectId}/fork`, {
    method: "POST",
    credentials: "include",
  });

  return response.json();
};
