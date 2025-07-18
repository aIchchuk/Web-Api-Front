import { useState } from "react";
import toast from "react-hot-toast";
import {
  getAllSongs,
  getSongById,
  createSongRequest,
  updateSongRequest,
  deleteSongRequest,
} from "../services/songService";

export const useSong = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllSongs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllSongs();
      setSongs(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load songs");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSongById = async (id) => {
    setIsLoading(true);
    try {
      const data = await getSongById(id);
      setCurrentSong(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch song");
    } finally {
      setIsLoading(false);
    }
  };

  const createSong = async (songData) => {
    setIsLoading(true);
    try {
      await createSongRequest(songData);
      toast.success("Song created successfully");
      fetchAllSongs();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create song");
    } finally {
      setIsLoading(false);
    }
  };

  const updateSong = async (id, payload) => {
    setIsLoading(true);
    try {
      await updateSongRequest(id, payload);
      toast.success("Song updated");
      fetchAllSongs();
    } catch (err) {
      toast.error("Failed to update song");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSong = async (id) => {
    setIsLoading(true);
    try {
      await deleteSongRequest(id);
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
