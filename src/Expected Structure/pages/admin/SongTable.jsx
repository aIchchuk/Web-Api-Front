import { useSong } from "../../hooks/useSong";
import { Calendar, Trash2 } from "lucide-react";
import { useEffect } from "react";

const SongTable = () => {
  const { song, isLoading, error, deleteSong, fetchAllSong } = useSong();

   useEffect(() => {
    fetchAllSong();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
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
    <div className="max-h-[200px] overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden">
      <table className="min-w-full table-auto text-white border-collapse pr-2 ">
        <thead className="bg-zinc-800 sticky top-0 z-10">
          <tr>
            <th className="w-[50px] p-2 text-left"> </th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Artist</th>
            <th className="p-2 text-left">Release Date</th>
            <th className="p-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {song.map((song) => (
            <tr key={song._id} className="hover:bg-zinc-800/50">
              <td className="p-2">
                <img
                  src={song.songImageUrl || song.songImage || "/placeholder-image.png"}
                  alt={song.songName}
                  className="w-10 h-10 rounded object-cover"
                />
              </td>
              <td className="p-2 font-medium">{song.songName}</td>
              <td className="p-2">{song.artistName}</td>
              <td className="p-2 text-zinc-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(song.createdAt).toISOString().split("T")[0]}
              </td>
              <td className="p-2 text-right">
                <button
                  onClick={() => deleteSong(song._id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded p-1"
                  aria-label={`Delete ${song.songName}`}
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default SongTable;
