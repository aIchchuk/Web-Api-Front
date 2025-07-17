import { useEffect } from "react";
// import { useSong } from "../../hooks/useSong";
import { useAlbum } from "../../hooks/useAlbum";
import PlaylistSkeleton from "../layout_components/skeleton/PlaylistSkeleton";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // const { songs, isLoading: isSongsLoading, fetchAllSongs } = useSong();
  const { album, isLoading: isAlbumLoading, fetchAllAlbum } = useAlbum();

  useEffect(() => {
    // fetchAllSongs();
    fetchAllAlbum();
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Navigation */}
      <div className="rounded-md w-full mb-3 border-b border-t">
        <Link to="/" className="flex items-center gap-4 px-3 py-3 text-sm text-white hover:bg-zinc-800">
          <HomeIcon className="size-5" />
          <span className="hidden md:inline">Home</span>
        </Link>
        <Link to="/chat" className="flex items-center gap-4 px-3 py-3 text-sm text-white hover:bg-zinc-800">
          <MessageCircleIcon className="size-5" />
          <span className="hidden md:inline">Messages</span>
        </Link>
      </div>

      {/* Playlists // LATER NEED TO DO FOR PLAYLISTS */}
      
      <div className="rounded-md w-full border-b border-t mt-3">
        <div className="flex items-center gap-4 px-3 py-2 mb-2 text-lg text-white">
          <Library className="size-6" />
          <span className="hidden md:inline">Albums</span>
        </div>
        <div className="h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden ">
          <div className="space-y-2 px-2">
            {isAlbumLoading ? (
              <PlaylistSkeleton />
            ) : album.length ? (
              album.map((album) => (
                <Link
                  to={`/album/${album._id}`}
                  key={album._id}
                  className="flex items-center gap-3 p-2 hover:bg-zinc-800 rounded-md"
                >
                  <img
                    src={album.albumImageUrl}
                    alt={album.albumName}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="hidden md:block min-w-0">
                    <p className="text-white font-medium truncate">{album.albumName}</p>
                    <p className="text-zinc-400 text-sm truncate">By {album.artistName}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-white text-sm px-2">No albums found</p>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Sidebar;
