import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL  // Vercel backend URL
});

// Optional: attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // better with Bearer
  }
  return config;
});

export default api;
