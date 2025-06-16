import axios from "axios";

export const apiAuth = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const apiPost = axios.create({
  baseURL: "http://localhost:3100/api/post",
  withCredentials: true,
});

export const apiComment = axios.create({
  baseURL: "http://localhost:3100/api/comment",
  withCredentials: true,
});
