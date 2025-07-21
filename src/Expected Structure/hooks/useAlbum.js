import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { 
  getAllAlbums, 
  getAlbumById, 
  updateAlbumById as apiUpdateAlbumById,   // assuming these exist
  deleteAlbumById as apiDeleteAlbumById 
} from "../services/albumService";

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

  // New: Update album by ID
  const updateAlbumById = async (albumId, updateData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedAlbum = await apiUpdateAlbumById(albumId, updateData);
      // Update local album list
      setAlbum((prevAlbums) =>
        prevAlbums.map((album) => (album._id === albumId ? updatedAlbum : album))
      );
      toast.success("Album updated successfully");
      return updatedAlbum;
    } catch (err) {
      toast.error("Failed to update album");
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // New: Delete album by ID
  const deleteAlbum = async (albumId) => {
    setIsLoading(true);
    setError(null);
    try {
      await apiDeleteAlbumById(albumId);
      // Remove deleted album from local list
      setAlbum((prevAlbums) => prevAlbums.filter((album) => album._id !== albumId));
      toast.success("Album deleted successfully");
    } catch (err) {
      toast.error("Failed to delete album");
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    album,
    currentAlbum,
    isLoading,
    error,
    fetchAllAlbum,
    fetchAlbumById,
    findAlbumById,
    updateAlbumById,
    deleteAlbum,
  };
};
