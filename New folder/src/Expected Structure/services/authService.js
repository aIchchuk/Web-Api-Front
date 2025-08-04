// services/authService.js
import { loginApi, registerApi } from "../api/authApi";

export const loginUserService = async ({ email, password }) => {
  // const res = await axiosInstance.post("/auth/login", { email, password });
  const res = await loginApi({email, password});
  return res.data; // This should contain { message, token, user }
};

export const registerUserService = async ({ fullName, email, password }) => {
  const res = await registerApi({fullName, email, password});
  return res.data; // This should contain { message, user }
};
