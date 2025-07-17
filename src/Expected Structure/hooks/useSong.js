import { useState } from "react";
import { axiosInstance } from "../api/api.js";
import toast from "react-hot-toast";

export const useSong = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET: All Songs
  const fetchAllSongs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/song/getAllSong");
      setSongs(res.data?.data || []); // ✅ fallback to empty array
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load songs");
    } finally {
      setIsLoading(false);
    }
  };

  // GET: Song by ID
  const fetchSongById = async (id) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/song/getSongById/${id}`);
      setCurrentSong(res.data?.data || null);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch song");
    } finally {
      setIsLoading(false);
    }
  };

  // POST: Create Song
  const createSong = async ({ songName, artistName, albumName, songImage, audioFile, songImageUrl, audioUrl }) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("songName", songName);
    formData.append("artistName", artistName);
    if (albumName) formData.append("albumName", albumName);
    if (songImage) formData.append("songImage", songImage);
    if (audioFile) formData.append("audioFile", audioFile);
    if (songImageUrl) formData.append("songImageUrl", songImageUrl);
    if (audioUrl) formData.append("audioUrl", audioUrl);

    try {
      const res = await axiosInstance.post("/song/createSong", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Song created successfully");
      fetchAllSongs(); // refresh list
      return res.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create song");
    } finally {
      setIsLoading(false);
    }
  };

  // PUT: Update Song
  const updateSong = async (id, payload) => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/song/updateSong/${id}`, payload);
      toast.success("Song updated");
      fetchAllSongs();
    } catch (err) {
      toast.error("Failed to update song");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE: Delete Song
  const deleteSong = async (id) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/song/deleteSong/${id}`);
      toast.success("Song deleted");
      setSongs((prev) => prev.filter((song) => song._id !== id));
    } catch (err) {
      toast.error("Failed to delete song");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    songs,
    currentSong,
    isLoading,
    error,
    fetchAllSongs,
    fetchSongById,
    createSong,
    updateSong,
    deleteSong,
  };
};
