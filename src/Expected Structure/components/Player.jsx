import React from 'react';
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
} from 'react-icons/fa';

const Player = () => {
  return (
    <div className="fixed bottom-0 left-6 right-6 h-[90px] bg-[rgba(43,43,43,0.868)] rounded-t-2xl shadow-[0_-4px_20px_rgba(27,27,27,0.559)] flex items-center justify-between px-8 text-white font-medium text-base z-[150] gap-4">
      
      {/* Music Info */}
      <div className="flex flex-col justify-center min-w-[150px]">
        <p className="m-0 font-bold text-sm">Now Playing</p>
        <span className="text-xs text-[#ffd6cc]">Artist – Song Title</span>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-8">
        <FaStepBackward className="text-xl cursor-pointer transition-transform duration-200 hover:scale-125" />
        <FaPlay className="text-2xl text-[#ffffff] cursor-pointer transition-transform duration-200 hover:scale-125" />
        {/* Replace <FaPlay /> with <FaPause /> for pause state */}
        <FaStepForward className="text-xl cursor-pointer transition-transform duration-200 hover:scale-125" />
      </div>

      {/* Volume & Progress */}
      <div className="flex items-center gap-6 min-w-[220px]">
        {/* Progress Bar */}
        <div className="bg-white/20 h-[6px] w-[120px] rounded-full overflow-hidden">
          <div className="w-[40%] h-full bg-white" />
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <FaVolumeUp className="text-base" />
          <input
            type="range"
            min="0"
            max="100"
            className="w-[80px] accent-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
