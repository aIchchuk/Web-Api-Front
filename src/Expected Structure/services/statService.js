import axios from "axios";

export const getStatRequest = async () => {
  const response = await axios.get("/api/stats"); // Adjust path if needed
  return response.data;
};
