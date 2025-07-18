import { axiosInstance } from "../api/api";

export const getAllAlbums = async () => {
  const res = await axiosInstance.get("/album");
  return res.data?.data || [];
};

export const getAlbumById = async (albumId) => {
  const res = await axiosInstance.get(`/album/${albumId}`);
  return res.data?.data || null;
};
