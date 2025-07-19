import React, { createContext, useContext, useState, useCallback } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const playSong = useCallback((songs = [], startIndex = 0) => {
    if (!songs.length || startIndex >= songs.length) return;
    setQueue(songs);
    setCurrentIndex(startIndex);
    setCurrentSong(songs[startIndex]);
    setIsPlaying(true);
  }, []);

  const playAlbum = useCallback((songs = [], startIndex = 0) => {
    playSong(songs, startIndex);
  }, [playSong]);

  const togglePlay = useCallback(() => {
    if (currentSong) setIsPlaying(prev => !prev);
  }, [currentSong]);

  const playNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      setCurrentIndex(nextIndex);
      setCurrentSong(queue[nextIndex]);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [currentIndex, queue]);

  const playPrevious = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setCurrentSong(queue[prevIndex]);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [currentIndex, queue]);

  return (
    <PlayerContext.Provider value={{
      currentSong,
      isPlaying,
      queue,
      currentIndex,
      playSong,
      playAlbum,
      togglePlay,
      playNext,
      playPrevious,
      setCurrentSong,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
