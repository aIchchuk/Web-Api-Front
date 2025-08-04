import { axiosInstance } from "./api";

export const registerApi = (data) => axiosInstance.post("/auth/register", data)
export const loginApi = (data) => axiosInstance.post("/auth/login", data)