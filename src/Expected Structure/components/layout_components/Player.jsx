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
    <div>


      <audio ref={audioRef} />
    </div>
  );
};

export default Player;