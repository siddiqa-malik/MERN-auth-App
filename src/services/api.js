import axios from "axios";

const resolvedBaseURL = import.meta.env.VITE_API_URL || "https://mern-auth-backend-green.vercel.app/api";


const api = axios.create({
  baseURL: resolvedBaseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
