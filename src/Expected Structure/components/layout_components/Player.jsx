import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../../hooks/usePlayer';

const Player = () => {
  const audioRef = useRef(null);
  const prevUrlRef = useRef(null);

  const {
    currentSong,
    isPlaying,
    playNext,
  } = usePlayer();

  // Handle play/pause toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => {
        console.error('Playback failed:', err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Auto-play next on song end
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playNext]);

  // Load new audio when song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    const url = currentSong.audioUrl || currentSong.audioFile;

    if (!url) return;

    const isSongChanged = prevUrlRef.current !== url;

    if (isSongChanged) {
      audio.src = url;
      audio.currentTime = 0;
      prevUrlRef.current = url;

      if (isPlaying) {
        audio.play().catch(err => {
          console.error('Playback error:', err);
        });
      }
    }
  }, [currentSong, isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 px-6 py-4 border-t border-zinc-800 z-50">
      {currentSong ? (
        <div className="flex items-center gap-4 text-white">
          <img
            src={currentSong.songImageUrl || currentSong.songImage}
            alt={currentSong.songName}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="font-medium truncate">{currentSong.songName}</span>
            <span className="text-sm text-neutral-400 truncate">
              {currentSong.artistName || "Unknown Artist"}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-neutral-400">No song selected</p>
      )}

      <audio ref={audioRef} />
    </div>
  );
};

export default Player;
