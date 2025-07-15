import axios from "axios";

export const registerApi = (data) => axios.post("/auth/register", data)
export const loginApi = (data) => axios.post("/auth/login", data)