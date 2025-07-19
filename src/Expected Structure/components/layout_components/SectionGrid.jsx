import React from "react";
import SectionGridSkeleton from "./skeleton/SectionGridSkeleton";

const SectionGrid = ({ song = [], title, isLoading }) => {
  if (isLoading) return <SectionGridSkeleton/>;

  const handlePlay = (song) => {
    alert(`Play: ${song.songName} by ${song.artistName}`);
    // Add your real play logic here
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <button
          className="text-sm text-zinc-400 hover:text-white focus:outline-none"
          onClick={() => {
            alert("Show all clicked");
          }}
        >
          Show all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {song.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer relative"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                <img
                  src={song.songImageUrl}
                  alt={song.songName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <button
                onClick={() => handlePlay(song)}
                className="absolute right-2 bottom-2 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 focus:outline-none"
                aria-label={`Play ${song.songName}`}
              >
                ▶️
              </button>
            </div>
            <h3 className="font-medium mb-2 truncate">{song.songName}</h3>
            <p className="text-sm text-zinc-400 truncate">{song.artistName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;
