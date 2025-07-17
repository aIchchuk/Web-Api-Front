import { useState } from "react";
import { axiosInstance } from "../api/api";
import toast from "react-hot-toast";

export const useAlbum = () => {
  const [album, setAlbum] = useState([]);
  const [singleAlbum, setSingleAlbum] = useState(null); // for album by ID
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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAlbumById = async (albumId) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/album/${albumId}`);
      setSingleAlbum(res.data?.data || null);
    } catch (err) {
      toast.error("Failed to fetch album details");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    album,
    singleAlbum,          // <-- expose the fetched single album
    isLoading,
    error,
    fetchAllAlbum,
    fetchAlbumById,       // <-- expose the function
  };
};
