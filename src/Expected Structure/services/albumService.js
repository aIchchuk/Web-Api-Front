import { axiosInstance } from "../api/api";

// Get all albums
export const getAllAlbums = async () => {
  const res = await axiosInstance.get("/album/getAllAlbum");
  return res.data?.data || [];
};

// Get album by ID
export const getAlbumById = async (albumId) => {
  const res = await axiosInstance.get(`/album/getAlbumById/${albumId}`);
  return res.data?.data || null;
};

// Create new album (with optional image upload)
export const createAlbum = async (formData) => {
  // formData should be a FormData instance containing album fields + albumImage file
  const res = await axiosInstance.post("/album/createAlbum", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data?.data || null;
};

// Update album by ID
export const updateAlbumById = async (albumId, updateData) => {
  // updateData can be JSON or FormData depending on your backend expectation
  const res = await axiosInstance.put(`/album/updateAlbum/${albumId}`, updateData, {
    headers:
      updateData instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
  });
  return res.data?.data || null;
};

// Delete album by ID
export const deleteAlbumById = async (albumId) => {
  const res = await axiosInstance.delete(`/album/deleteAlbum/${albumId}`);
  return res.data?.data || null;
};

// Add song to album
export const addSongToAlbum = async (albumId, songId) => {
  const res = await axiosInstance.post(`/album/${albumId}/songs/${songId}`);
  return res.data?.data || null;
};

// Remove song from album
export const removeSongFromAlbum = async (albumId, songId) => {
  const res = await axiosInstance.delete(`/album/${albumId}/songs/${songId}`);
  return res.data?.data || null;
};
