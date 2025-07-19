import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import { useAlbum } from '../hooks/useAlbum';
import { usePlayer } from '../hooks/usePlayer';

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useAlbum();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayer();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading || !currentAlbum) return null;

  const isAlbumPlaying = currentSong && currentAlbum.song?.some(s => s._id === currentSong._id) && isPlaying;

  const handlePlayAlbum = () => {
    if (!currentAlbum?.song?.length) return;

    if (isAlbumPlaying) {
      togglePlay();
    } else {
      playAlbum(currentAlbum.song, 0); // start from first song
    }
  };

  return (
    <div className="h-full">
      <div className="rounded-md relative min-h-full">
        {/* bg-gradient */}
        <div className="rounded-lg absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none" />

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

              {/* ✅ Play / Pause Album Button */}
              <div className="mt-4">
                <button
                  onClick={handlePlayAlbum}
                  className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all flex items-center justify-center"
                  aria-label={isAlbumPlaying ? 'Pause album' : 'Play album'}
                >
                  {isAlbumPlaying ? (
                    <Pause className="h-7 w-7 text-black" />
                  ) : (
                    <Play className="h-7 w-7 text-black" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Tracklist */}
          <div className="bg-black/20 backdrop-blur-sm rounded-b-md">
            <div className="grid grid-cols-[16px_4fr_2fr_2fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
              <div>#</div>
              <div>Title</div>
              <div>Release Date</div>
              <div>Album</div>
            </div>

            <div className="px-6">
              <div className="space-y-2 py-4">
                {currentAlbum.song?.map((song, index) => {
                  const isCurrentSong = currentSong?._id === song._id;
                  return (
                    <div
                      key={song._id}
                      onClick={() => playAlbum(currentAlbum.song, index)}
                      className="grid grid-cols-[16px_4fr_2fr_2fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                    >
                      <div className="flex items-center justify-center">
                        {isCurrentSong && isPlaying ? (
                          <div className="size-4 text-green-500">♫</div>
                        ) : (
                          <span className="group-hover:hidden">{index + 1}</span>
                        )}
                        {!isCurrentSong && (
                          <Play className="h-4 w-4 hidden group-hover:block" />
                        )}
                      </div>

                      <div className="flex flex-row gap-4 items-center">
                        <img src={song.songImageUrl} alt={song.title} className="size-10" />
                        <div className="flex flex-col">
                          <div className="font-medium text-white">{song.songName}</div>
                          <div className="text-pink-400 text-xs">{song.artistName}</div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {song.createdAt ? song.createdAt.split('T')[0] : '-'}
                      </div>

                      <div className="flex items-center">{currentAlbum.albumName}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
