import { apiAuth } from "../utils/axios";

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const registerUser = async (pseudo, email, password) => {
  const res = await apiAuth.post("/auth/register", {
    pseudo,
    email,
    password,
    role: "User",
  });
  return res.data;
};

export const loginUser = async (pseudo, password) => {
    const res = await apiAuth.post("/auth/login", {
      pseudo,
      password,
    });
    return res.data;
};
