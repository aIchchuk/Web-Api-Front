import { axiosInstance } from "../api/api";

// ✅ Updated to match singular route
export const getAllSongs = async () => {
  const res = await axiosInstance.get("/song/getAllSong");
  return res.data?.data || [];
};

export const getSongById = async (id) => {
  const res = await axiosInstance.get(`/song/getSongById/${id}`);
  return res.data?.data || null;
};

export const getFeaturedSong = async () => {
  const res = await axiosInstance.get("/song/featuredSong");
  return res.data?.data || [];
};

export const getMadeForYouSong = async () => {
  const res = await axiosInstance.get("/song/madeForYouSong");
  return res.data?.data || [];
};

export const getTrendingSong = async () => {
  const res = await axiosInstance.get("/song/trendingSong");
  return res.data?.data || [];
};

export const createSongRequest = async ({
  songName,
  artistName,
  albumName,
  songImage,
  audioFile,
  songImageUrl,
  audioUrl,
}) => {
  const formData = new FormData();
  formData.append("songName", songName);
  formData.append("artistName", artistName);
  if (albumName) formData.append("albumName", albumName);
  if (songImage) formData.append("songImage", songImage);
  if (audioFile) formData.append("audioFile", audioFile);
  if (songImageUrl) formData.append("songImageUrl", songImageUrl);
  if (audioUrl) formData.append("audioUrl", audioUrl);

  const res = await axiosInstance.post("/song/createSong", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const updateSongRequest = async (id, payload) => {
  return await axiosInstance.put(`/song/updateSong/${id}`, payload);
};

export const deleteSongRequest = async (id) => {
  return await axiosInstance.delete(`/song/deleteSong/${id}`);
};
