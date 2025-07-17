import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlbum } from "../hooks/useAlbum";
import { Play } from "lucide-react";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useAlbum();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading || !currentAlbum) return null;

  // Dummy play handlers
  const handlePlayAlbum = () => alert("Play album feature not implemented");
  const handlePlaySong = (index) => alert(`Play song #${index + 1} feature not implemented`);

  return (
    <div className="h-full">
      <div className="rounded-md relative min-h-full">

        {/* bg-gradient */}
        <div className="rounded-lg absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none" aria-hidden="true"/>

        {/* main-content */}
        <div className="relative z-10 min-h-full">
          <div className="flex p-6 gap-6 pb-8">
            <img
              src={currentAlbum.albumImageUrl}
              alt={currentAlbum.albumName}
              className="w-[240px] h-[240px] shadow-xl rounded"
            />
            <div className="flex flex-col justify-end">
              <p className="text-sm font-medium text-pink-300">Album</p>
              <h1 className="text-7xl font-bold my-4 text-white">{currentAlbum.albumName}</h1>
              <div className="flex items-center gap-2 text-sm text-zinc-100">
                <span className="font-medium text-white">{currentAlbum.artistName}</span>
                <span>• {currentAlbum.song?.length || 0} songs</span>
              </div>

              <div className="mt-4">
                <button
                  onClick={handlePlayAlbum}
                  className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all flex items-center justify-center"
                  aria-label="Play album"
                >
                  <Play className="h-7 w-7 text-black" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-b-md">
            <div className="grid grid-cols-[16px_4fr_2fr_2fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
              <div>#</div>
              <div>Title</div>
              <div>Release Date</div> {/* Changed to Release Date text */}
              <div>Album</div> {/* Added Album column */}
            </div>

            <div className="px-6">
              <div className="space-y-2 py-4">
                {currentAlbum.song?.map((song, index) => (
                  <div
                    key={song._id}
                    onClick={() => handlePlaySong(index)}
                    className="grid grid-cols-[16px_4fr_2fr_2fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      <span className="group-hover:hidden">{index + 1}</span>
                      <Play className="h-4 w-4 hidden group-hover:block" />
                    </div>

                    <div className="flex flex-col">
                      <div className="font-medium text-white">{song.songName}</div>
                      <div className="text-pink-400 text-xs">{song.artistName}</div>
                    </div>

                    <div className="flex items-center">{song.createdAt ? song.createdAt.split("T")[0] : "-"}</div>

                    <div className="flex items-center">{currentAlbum.albumName}</div> {/* Display album name */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
 
      </div>
    </div>
  );
};

export default AlbumPage;
