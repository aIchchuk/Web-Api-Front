import React, { useEffect, useRef, useState } from "react";
import { usePlayer } from "../../hooks/usePlayer";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
} from "react-icons/fa";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
  } = usePlayer();

  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Grab the global audio element
  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => playNext();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, playNext]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolumeChange = (e) => {
    const value = Number(e.target.value);
    setVolume(value);
  };

//   if (!currentSong) return null;

  // Use placeholders if no currentSong
  const songImage = currentSong?.songImageUrl || null ; // your default image or blank
  const songName = currentSong?.songName || "No song selected";
  const artistName = currentSong?.artistName || "Unknown artist";

  return (
    <div className="fixed bottom-0 left-6 right-6 h-[90px] bg-[rgba(43,43,43,0.868)] rounded-t-2xl shadow-[0_-4px_20px_rgba(27,27,27,0.559)] flex items-center justify-between px-10 text-white font-medium text-base z-[150] w-auto gap-x-6 backdrop-blur-md">
      {/* Music Info */}
      <div className="flex items-center gap-4 min-w-[150px]">
        <img
          src={songImage}
          className="w-12 h-12 rounded-md object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="m-0 font-bold text-sm font-sans truncate max-w-[160px]">
            {songName}
          </p>
          <span className="text-xs font-semibold text-pink-400 truncate max-w-[160px]">
            {artistName}
          </span>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-8">
        <FaStepBackward
          className={`text-xl cursor-pointer transition-transform duration-200 hover:scale-125 ${
            currentSong ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={currentSong ? playPrevious : undefined}
        />
        {isPlaying ? (
          <FaPause
            className={`text-2xl text-white cursor-pointer transition-transform duration-200 hover:scale-125 ${
              currentSong ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={currentSong ? togglePlay : undefined}
          />
        ) : (
          <FaPlay
            className={`text-2xl text-white cursor-pointer transition-transform duration-200 hover:scale-125 ${
              currentSong ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={currentSong ? togglePlay : undefined}
          />
        )}
        <FaStepForward
          className={`text-xl cursor-pointer transition-transform duration-200 hover:scale-125 ${
            currentSong ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={currentSong ? playNext : undefined}
        />
      </div>

      {/* Volume & Progress */}
      <div className="flex items-center gap-6 min-w-[220px]">
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <span className="text-white text-[13px]">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-[120px] accent-white"
            disabled={!currentSong}
          />
          <span className="text-white text-[13px]">{formatTime(duration)}</span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <FaVolumeUp className="text-base" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-[80px] accent-white"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer