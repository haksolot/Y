import axios from "axios";
const BASE_URL = import.meta.env.API_URL || "https://localhost:443";
// ou .env : VITE_API_URL=https://192.168.1.42


export const apiAuth = axios.create({
  // baseURL: "http://localhost:3000/api/auth",
  // baseURL: "https://localhost:443/api/auth",
  baseURL: BASE_URL + "/api/auth",
  withCredentials: true,
});

export const apiPost = axios.create({
  // baseURL: "http://localhost:3100/api/post",
  // baseURL: "https://localhost:443/api/post",
  baseURL: BASE_URL + "/api/post",
  withCredentials: true,
});

export const apiComment = axios.create({
  // baseURL: "http://localhost:3100/api/comment",
  baseURL: BASE_URL + "/api/comment",
  withCredentials: true,
});

export const apiProfile = axios.create({
  // baseURL: "http://localhost:3200/api/profile",
  baseURL: BASE_URL + "/api/profile",
  withCredentials: true,
});

export const apiNotif = axios.create({
  baseURL: "http://localhost:3300/api/notif",
  withCredentials: true,
})

