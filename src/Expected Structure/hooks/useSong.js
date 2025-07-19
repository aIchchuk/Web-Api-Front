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
  const [song, setSong] = useState([]); // previously: songs
  const [currentSong, setCurrentSong] = useState(null);
  const [featuredSong, setFeaturedSong] = useState([]); // previously: featuredSongs
  const [madeForYouSong, setMadeForYouSong] = useState([]); // previously: madeForYouSongs
  const [trendingSong, setTrendingSong] = useState([]); // previously: trendingSongs
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
      toast.error("Failed to load song");
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

  const fetchFeaturedSong = async () => {
    try {
      const data = await getFeaturedSong();
      setFeaturedSong(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load featured song");
    }
  };

  const fetchMadeForYouSong = async () => {
    try {
      const data = await getMadeForYouSong();
      setMadeForYouSong(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load made-for-you song");
    }
  };

  const fetchTrendingSong = async () => {
    try {
      const data = await getTrendingSong();
      setTrendingSong(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load trending song");
    }
  };

  const createSong = async (songData) => {
    setIsLoading(true);
    try {
      await createSongRequest(songData);
      toast.success("Song created successfully");
      fetchAllSong();
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
      fetchAllSong();
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
