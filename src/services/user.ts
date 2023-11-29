import { BASE_URL } from "./shared";

const getUserProfile = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
  });

  return response.json();
};

export { getUserProfile };
