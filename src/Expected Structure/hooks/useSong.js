import { useState } from "react";
import toast from "react-hot-toast";
import {
  getAllSongs,
  getSongById,
  getFeaturedSong,
  getMadeForYouSong,
  getTrendingSong,
  createSongRequest,
  updateSongRequest,
  deleteSongRequest,
} from "../services/songService";

export const useSong = () => {
  const [song, setSong] = useState([]); // array of songs, named 'song'
  const [currentSong, setCurrentSong] = useState(null);
  const [featuredSong, setFeaturedSong] = useState([]);
  const [madeForYouSong, setMadeForYouSong] = useState([]);
  const [trendingSong, setTrendingSong] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllSong = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllSongs();
      setSong(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load songs");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSongById = async (id) => {
    setIsLoading(true);
    setError(null);
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

  const fetchFeaturedSong = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFeaturedSong();
      setFeaturedSong(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load featured songs");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMadeForYouSong = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMadeForYouSong();
      setMadeForYouSong(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load made-for-you songs");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingSong = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTrendingSong();
      setTrendingSong(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load trending songs");
    } finally {
      setIsLoading(false);
    }
  };

  const createSong = async (songData) => {
    setIsLoading(true);
    setError(null);
    try {
      await createSongRequest(songData);
      toast.success("Song created successfully");
      await fetchAllSong();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create song");
    } finally {
      setIsLoading(false);
    }
  };

  const updateSong = async (id, payload) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateSongRequest(id, payload);
      toast.success("Song updated");
      await fetchAllSong();
    } catch (err) {
      toast.error("Failed to update song");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSong = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteSongRequest(id);
      toast.success("Song deleted");
      setSong((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      toast.error("Failed to delete song");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    song,
    currentSong,
    featuredSong,
    madeForYouSong,
    trendingSong,
    isLoading,
    error,
    fetchAllSong,
    fetchSongById,
    fetchFeaturedSong,
    fetchMadeForYouSong,
    fetchTrendingSong,
    createSong,
    updateSong,
    deleteSong,
  };
};
