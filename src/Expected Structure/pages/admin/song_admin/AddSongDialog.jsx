import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useSong } from "../../../hooks/useSong";
import { Plus } from "lucide-react";

const AddSongDialog = () => {
  const { createSong } = useSong();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form input state
  const [form, setForm] = useState({
    songName: "",
    artistName: "",
  });

  // File input state — names must match backend expectations
  const [files, setFiles] = useState({
    audioFile: null,
    songImage: null,
  });

  const audioRef = useRef();
  const imageRef = useRef();

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = async () => {
    if (!form.songName || !form.artistName) {
      return toast.error("Please enter both song name and artist name.");
    }

    if (!files.audioFile || !files.songImage) {
      return toast.error("Please upload both audio and image files.");
    }

    const formData = new FormData();
    formData.append("songName", form.songName);
    formData.append("artistName", form.artistName);
    formData.append("audioFile", files.audioFile);   // must match backend multer field
    formData.append("songImage", files.songImage);   // must match backend multer field

    try {
      setIsLoading(true);
      await createSong(formData);
      toast.success("Song added successfully!");

      // Reset and close modal
      setForm({ songName: "", artistName: "" });
      setFiles({ audioFile: null, songImage: null });
      setIsOpen(false);
    } catch (err) {
      console.error("Error creating song:", err);
      toast.error("Failed to add song.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
      >
        <Plus className="w-4 h-4" />
        Add Song
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 text-white p-6 rounded-lg w-full max-w-md shadow-xl space-y-5">
            <h2 className="text-xl font-semibold">Add New Song</h2>

            {/* Song Name */}
            <div className="space-y-1">
              <label className="text-sm">Song Name</label>
              <input
                type="text"
                value={form.songName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, songName: e.target.value }))
                }
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none"
              />
            </div>

            {/* Artist Name */}
            <div className="space-y-1">
              <label className="text-sm">Artist Name</label>
              <input
                type="text"
                value={form.artistName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, artistName: e.target.value }))
                }
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none"
              />
            </div>

            {/* Audio Upload */}
            <div className="space-y-1">
              <label className="text-sm">Audio File</label>
              <button
                type="button"
                onClick={() => audioRef.current?.click()}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-left"
              >
                {files.audioFile ? files.audioFile.name : "Choose Audio File"}
              </button>
              <input
                type="file"
                accept="audio/*"
                hidden
                ref={audioRef}
                onChange={(e) => handleFileChange(e, "audioFile")}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-1">
              <label className="text-sm">Image File</label>
              <button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-left"
              >
                {files.songImage ? files.songImage.name : "Choose Image File"}
              </button>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={imageRef}
                onChange={(e) => handleFileChange(e, "songImage")}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-zinc-600 rounded text-white"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded text-black font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Add Song"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSongDialog;
