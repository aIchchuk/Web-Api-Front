// songService.js
import { axiosInstance } from "../api/api";

// Get all songs
export const getAllSongs = async () => {
  const res = await axiosInstance.get("/song/getAllSong");
  return res.data?.data || [];
};

// Get song by ID
export const getSongById = async (id) => {
  const res = await axiosInstance.get(`/song/getSongById/${id}`);
  return res.data?.data || null;
};

// Get featured songs
export const getFeaturedSong = async () => {
  const res = await axiosInstance.get("/song/featuredSong");
  return res.data?.data || [];
};

// Get "made for you" songs
export const getMadeForYouSong = async () => {
  const res = await axiosInstance.get("/song/madeForYouSong");
  return res.data?.data || [];
};

// Get trending songs
export const getTrendingSong = async () => {
  const res = await axiosInstance.get("/song/trendingSong");
  return res.data?.data || [];
};

// Create a new song (with image + audio upload)
export const createSongRequest = async (formData) => {
  // formData is a FormData object
  const res = await axiosInstance.post("/song/createSong", formData);
  return res.data;
};

// Update a song by ID (payload can be JSON or FormData)
export const updateSongRequest = async (id, payload) => {
  const config = {
    headers: {},
  };

  if (payload instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  const res = await axiosInstance.put(`/song/updateSong/${id}`, payload, config);
  return res.data;
};

// Delete a song by ID
export const deleteSongRequest = async (id) => {
  const res = await axiosInstance.delete(`/song/deleteSong/${id}`);
  return res.data;
};

// Convert Instagram Reel URL to song
export const convertReelToSongRequest = async ({ reelUrl, songName, artistName, albumName }) => {
  const payload = { reelUrl, songName, artistName, albumName };
  const res = await axiosInstance.post("/song/convert-reel", payload);
  return res.data;
};
