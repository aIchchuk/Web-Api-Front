// services/authService.js
import { axiosInstance } from "../api/api";

export const loginUserService = async ({ email, password }) => {
  const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data; // This should contain { message, token, user }
};

export const registerUserService = async ({ fullName, email, password }) => {
  const res = await axiosInstance.post("/auth/register", { fullName, email, password });
  return res.data; // This should contain { message, user }
};
