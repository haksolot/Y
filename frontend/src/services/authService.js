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
