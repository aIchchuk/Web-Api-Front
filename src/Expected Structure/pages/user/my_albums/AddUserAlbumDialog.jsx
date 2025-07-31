import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus, Upload } from "lucide-react";

import { getAllSongs } from "../../../services/songService"; // adjust path
import { createAlbum } from "../../../services/albumService";

const AddUserAlbumDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [newAlbum, setNewAlbum] = useState({
    albumName: "",
    artistName: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [songs, setSongs] = useState([]);
  const [selectedSongIds, setSelectedSongIds] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getAllSongs()
        .then(setSongs)
        .catch(() => {
          toast.error("Failed to load songs");
          setSongs([]);
        });
    }
  }, [isOpen]);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const toggleSongSelection = (songId) => {
    setSelectedSongIds((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  const handleSubmit = async () => {
    if (!newAlbum.albumName || !newAlbum.artistName) {
      return toast.error("Please fill album name and artist.");
    }
    if (!imageFile) {
      return toast.error("Please upload an album image.");
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("albumName", newAlbum.albumName);
      formData.append("artistName", newAlbum.artistName);
      formData.append("albumImage", imageFile);
      
      selectedSongIds.forEach(id => formData.append("song", id));

      await createAlbum(formData);

      toast.success("Album created successfully");
      setNewAlbum({ albumName: "", artistName: "" });
      setImageFile(null);
      setSelectedSongIds([]);
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to create album");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="w-4 h-4" />
        Add Album
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 text-white rounded-lg max-w-lg w-full p-6 space-y-4 shadow-lg overflow-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold">Add New Album</h2>

            {/* Album Image Upload */}
            <div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageSelect}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-left"
              >
                {imageFile ? imageFile.name : "Choose Album Image"}
              </button>
            </div>

            {/* Album Name */}
            <div>
              <label className="block text-sm mb-1">Album Name</label>
              <input
                type="text"
                value={newAlbum.albumName}
                onChange={(e) =>
                  setNewAlbum({ ...newAlbum, albumName: e.target.value })
                }
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none"
                placeholder="Enter album name"
              />
            </div>

            {/* Artist Name */}
            <div>
              <label className="block text-sm mb-1">Artist</label>
              <input
                type="text"
                value={newAlbum.artistName}
                onChange={(e) =>
                  setNewAlbum({ ...newAlbum, artistName: e.target.value })
                }
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none"
                placeholder="Enter artist name"
              />
            </div>

            {/* Select Songs */}
            <div>
              <label className="block text-sm mb-2 font-semibold">Select Songs</label>
              <div className="max-h-40 overflow-y-auto border border-zinc-700 rounded p-2 bg-zinc-800 space-y-1 [&::-webkit-scrollbar]:hidden">
                {songs.length === 0 ? (
                  <p className="text-sm text-zinc-400">No songs available</p>
                ) : (
                  songs.map((song) => {
                    const isSelected = selectedSongIds.includes(song._id);
                    return (
                      <div
                        key={song._id}
                        onClick={() => toggleSongSelection(song._id)}
                        className={`px-3 py-2 rounded cursor-pointer transition-all ${
                          isSelected
                            ? "bg-violet-600 text-white border border-violet-400"
                            : "hover:bg-zinc-700 text-zinc-300"
                        }`}
                      >
                        <span className="text-sm font-medium">{song.songName}</span>
                        <span className="text-sm text-zinc-400 ml-2">— {song.artistName}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>


            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="px-4 py-2 border border-zinc-600 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={
                  isLoading ||
                  !imageFile ||
                  !newAlbum.albumName.trim() ||
                  !newAlbum.artistName.trim()
                }
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded text-white font-medium"
              >
                {isLoading ? "Creating..." : "Add Album"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserAlbumDialog;
