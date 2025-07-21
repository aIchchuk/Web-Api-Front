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

  // Play or pause based on isPlaying
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

  // Play next when current audio ends
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

  // Change source when currentSong changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    const url = currentSong.audioUrl || currentSong.audioFile;

    if (!url) return;

    const isSongChange = prevUrlRef.current !== url;

    if (isSongChange) {
      audio.src = url;
      audio.currentTime = 0;
      prevUrlRef.current = url;

      if (isPlaying) {
        audio.play().catch(err => console.error('Playback error:', err));
      }
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default Player;
