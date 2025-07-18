import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getAllAlbums, getAlbumById } from "../services/albumService";

export const useAlbum = () => {
  const [album, setAlbum] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllAlbum = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllAlbums();
      setAlbum(data);
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
      const data = await getAlbumById(albumId);
      setCurrentAlbum(data);
    } catch (err) {
      toast.error("Failed to fetch album");
      setError(err.message || "Unknown error");
      setCurrentAlbum(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const findAlbumById = (albumId) =>
    album.find((albumItem) => albumItem._id === albumId) || null;

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
