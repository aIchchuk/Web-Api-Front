import { axiosInstance } from "../api/api";

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/user/getAllUsers");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/user/getUserById/${id}`);
  return response.data;
};

export const updateUserById = async (id, data) => {
  const response = await axiosInstance.put(`/user/updateUserById/${id}`, data);
  return response.data;
};

export const deleteUserById = async (id) => {
  const response = await axiosInstance.delete(`/user/deleteUserById/${id}`);
  return response.data;
};
