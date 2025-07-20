import { useState } from "react";
import toast from "react-hot-toast";
import { getStatRequest } from "../services/statService";

export const useStat = () => {
  const [stat, setStat] = useState({
    totalUser: 0,
    totalArtist: 0,
    totalSong: 0,
    totalAlbum: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStat = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getStatRequest();
      setStat(data);
    } catch (err) {
      toast.error("Failed to fetch stats");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stat,
    isLoading,
    error,
    fetchStat,
  };
};
