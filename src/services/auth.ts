import { BASE_URL } from "./shared";

const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/auth/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};

const signUp = async ({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/auth/sign-up`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });

  return response.json();
};

const signOut = async () => {
  const response = await fetch(`${BASE_URL}/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  });

  return response.json();
};

export { signIn, signUp, signOut };
