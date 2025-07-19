import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../../hooks/usePlayer';

const Player = () => {
  const audioRef = useRef(null);
  const prevSongRef = useRef(null);

  const {
    currentSong,
    isPlaying,
    playNext,
  } = usePlayer();

  // Play / pause audio
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('Playback failed:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // On audio ended, play next song
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

  // Change audio source when song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong.audioUrl;

    if (isSongChange) {
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong.audioUrl;

      if (isPlaying) {
        audio.play().catch(err => console.error('Playback error:', err));
      }
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default Player;
