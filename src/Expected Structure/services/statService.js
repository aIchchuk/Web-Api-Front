import { axiosInstance } from "../api/api";

// services/statService.js or similar
export const getStatRequest = async () => {
  const response = await axiosInstance.get("/stat");
  return response.data;
};
