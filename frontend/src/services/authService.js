import { apiAuth } from "../utils/axios";
import { createProfile } from "./profileService";

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const registerUser = async (pseudo, email, password) => {
  const res = await apiAuth.post("/register", {
    pseudo,
    email,
    password,
    role: "User",
  });
  console.log("res", res);
  const profile = await createProfile(res.data.id, {
    userId: res.data.id,
    display_name: pseudo,
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

export const logout = async () => {
  const res = await apiAuth.post("/logout");
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

export const getUserByProfileName = async (profileName) => {
  const res = await apiAuth.get("/getUserByProfileName", {
    params: { profileName },
  });
  return res.data;
};
