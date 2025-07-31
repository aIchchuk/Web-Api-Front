import { useEffect } from "react";
import { Calendar, Trash2 } from "lucide-react";
import { useAlbum } from "../../../hooks/useAlbum";

const UserAlbumTable = () => {
  const { album, isLoading, error, 
    // deleteAlbum, 
    fetchAllAlbum } = useAlbum();

  useEffect(() => {
    fetchAllAlbum();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading albums...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-h-[250px] overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden rounded-lg">
      <table className="min-w-full table-auto text-white border-collapse pr-2">
        <thead className="bg-zinc-800 sticky top-0 z-10">
          <tr>
            <th className="w-[50px] p-2 text-left"></th>
            <th className="p-2 text-left">Album Name</th>
            <th className="p-2 text-left">Artist</th>
            <th className="p-2 text-left">Files</th>
            <th className="p-2 text-left">Release Date</th>
            <th className="p-2 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {album.map((albumItem) => (
            <tr key={albumItem._id} className="hover:bg-zinc-800/50">
              {/* Cover Image */}
              <td className="p-2">
                <img
                  src={
                    albumItem.albumImageUrl ||
                    albumItem.albumImage ||
                    "/placeholder-image.png"
                  }
                  alt={albumItem.albumName}
                  className="w-10 h-10 rounded object-cover"
                />
              </td>

              {/* Album Name */}
              <td className="p-2 font-medium">{albumItem.albumName}</td>

              {/* Artist Name */}
              <td className="p-2">{albumItem.artistName}</td>

              {/* File Info */}
              <td className="p-2 text-sm text-zinc-400">
                <div>{albumItem.originalImageFileName || "N/A"}</div>
              </td>

              {/* Release Date */}
              <td className="p-2 text-zinc-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(albumItem.createdAt).toISOString().split("T")[0]}
                </div>
              </td>

              {/* Delete */}
              {/* <td className="p-2 text-right">
                <button
                  onClick={() => deleteAlbum(albumItem._id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded p-1"
                  aria-label={`Delete ${albumItem.albumName}`}
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAlbumTable;
