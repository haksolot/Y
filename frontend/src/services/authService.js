import { apiAuth } from "../utils/axios";

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const registerUser = async (pseudo, email, password) => {
  const res = await apiAuth.post("/register", {
    pseudo,
    email,
    password,
    role: "User",
  });
  return res.data;
};

export const loginUser = async (pseudo, password) => {
  const res = await apiAuth.post("/login", {
    pseudo,
    password,
  });
  return res.data;
};

export const getUserById = async (id) => {
  const res = await apiAuth.get("/getUserById", {
    params: { id },
  });
  return res.data;
};

export const getUserIdFromCookie = async () => {
  try {
    const response = await apiAuth.post(
      "/authenticate",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data.userId;
  } catch (error) {
    console.error("Failed to fetch user ID:", error);
    return null;
  }
};
