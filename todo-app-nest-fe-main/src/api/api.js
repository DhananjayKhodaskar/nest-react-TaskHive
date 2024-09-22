import axios from "axios";
import { logoutUser } from "../utils/common";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
    { refreshToken: refreshToken }
  );
  if (response?.data?.success === false) {
    console.log("Token expired, logging out");
    logoutUser();
    return;
  }
  return response.data;
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newTokens = await refreshAccessToken();
        console.log(newTokens, "new tokens");
        localStorage.setItem("access_token", newTokens?.data?.accessToken);
        localStorage.setItem("refresh_token", newTokens?.data?.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        logoutUser();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
