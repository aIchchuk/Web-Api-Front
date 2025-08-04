import React from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../../hooks/usePlayer';

const PlayButton = ({ song }) => {
  const {
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
  } = usePlayer();

  if (!song) return null; // Safety check

  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong([song], 0); // play single song
    }
  };

  return (
    <button
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 rounded-full bg-pink-500 hover:bg-pink-400 hover:scale-105 transition-all  w-10 h-10 flex items-center justify-center
        opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      aria-label={isCurrentSong && isPlaying ? 'Pause' : 'Play'}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="w-5 h-5 text-black" />
      ) : (
        <Play className="w-5 h-5 text-black" />
      )}
    </button>
  );
};

export default PlayButton;
