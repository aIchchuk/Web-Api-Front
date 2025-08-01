// useSong.js
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
  convertReelToSongRequest,
} from "../services/songService";

export const useSong = () => {
  const [songs, setSongs] = useState([]); // plural: array of songs
  const [currentSong, setCurrentSong] = useState(null);
  const [featuredSong, setFeaturedSongs] = useState([]);
  const [madeForYouSong, setMadeForYouSongs] = useState([]);
  const [trendingSong, setTrendingSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertReelToSong = async ({ reelUrl, songName, artistName, albumName }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await convertReelToSongRequest({ reelUrl, songName, artistName, albumName });
      toast.success("Reel converted and song saved successfully!");
      await fetchAllSong();
      return res;
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to convert reel";
      toast.error(msg);
      setError(msg);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllSong = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllSongs();
      setSongs(data);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to load songs";
      setError(msg);
      toast.error(msg);
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
      const msg = err?.response?.data?.message || err.message || "Failed to fetch song";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFeaturedSong = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFeaturedSong();
      setFeaturedSongs(data);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to load featured songs";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMadeForYouSong = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMadeForYouSong();
      setMadeForYouSongs(data);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to load made-for-you songs";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingSong = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTrendingSong();
      setTrendingSongs(data);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to load trending songs";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const createSong = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      await createSongRequest(formData);
      toast.success("Song created successfully");
      await fetchAllSong();
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to create song";
      toast.error(msg);
      setError(msg);
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
      const msg = err?.response?.data?.message || err.message || "Failed to update song";
      toast.error(msg);
      setError(msg);
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
      setSongs((prev) => prev.filter((song) => song._id !== id));
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to delete song";
      toast.error(msg);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    songs,
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
    convertReelToSong,
  };
};
