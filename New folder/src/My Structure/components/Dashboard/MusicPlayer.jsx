import React from 'react';
import './MusicPlayer.css';
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
} from 'react-icons/fa';

const MusicPlayer = () => {
  return (
    <div className="music-player">
      <div className="music-info">
        <p>Now Playing</p>
        <span>Artist – Song Title</span>
      </div>

      <div className="player-controls">
        <FaStepBackward className="control-icon" />
        <FaPlay className="control-icon play" />
        {/* Replace <FaPlay /> with <FaPause /> for pause state */}
        <FaStepForward className="control-icon" />
      </div>

      <div className="volume-progress">
        <div className="progress-bar">
          <div className="progress-fill" />
        </div>
        <div className="volume-control">
          <FaVolumeUp className="volume-icon" />
          <input type="range" min="0" max="100" className="volume-slider" />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
