import { useState, useCallback } from "react";
import { axiosInstance } from "../api/api";
import toast from "react-hot-toast";

export const useAlbum = () => {
  const [album, setAlbum] = useState([]); // list of all albums
  const [currentAlbum, setCurrentAlbum] = useState(null); // one album by ID
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllAlbum = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/album");
      setAlbum(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to fetch albums");
      setError(err.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAlbumById = useCallback(async (albumId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/album/${albumId}`); // fixed URL
      setCurrentAlbum(response.data?.data || null); // set currentAlbum state
    } catch (err) {
      toast.error("Failed to fetch album");
      setError(err.message || "Unknown error");
      setCurrentAlbum(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Optional helper to find album by ID from album list
  const findAlbumById = (albumId) => {
    return album.find((albumItem) => albumItem._id === albumId) || null;
  };

  return {
    album,
    currentAlbum,
    isLoading,
    error,
    fetchAllAlbum,
    fetchAlbumById,
    findAlbumById,
  };
};
