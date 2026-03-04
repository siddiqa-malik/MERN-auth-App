import axios from "axios";

const resolvedBaseURL = import.meta.env.VITE_API_URL || "https://mern-auth-backend-green.vercel.app/api";


const api = axios.create({
  baseURL: resolvedBaseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers = config.headers || {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // some backends expect the raw token header name
    config.headers["x-auth-token"] = token;
  }
  // debug request headers (helps diagnose 401 issues)
  // eslint-disable-next-line no-console
  console.debug("API request:", config.method, config.url, "Auth:", !!config.headers.Authorization);
  return config;
});

export default api;
