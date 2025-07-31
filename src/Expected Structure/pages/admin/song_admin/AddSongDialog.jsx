import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useSong } from "../../../hooks/useSong";
import { Plus } from "lucide-react";

const AddSongDialog = () => {
  const { createSong, convertReelToSong } = useSong();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form input state
  const [form, setForm] = useState({
    songName: "",
    artistName: "",
    albumName: "",
    reelUrl: "",
  });

  // File input state
  const [files, setFiles] = useState({
    audioFile: null,
    songImage: null,
  });

  // Toggle between upload and reel url mode
  const [useReelUrl, setUseReelUrl] = useState(false);

  const audioRef = useRef();
  const imageRef = useRef();

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!form.songName || !form.artistName) {
      return toast.error("Please enter both song name and artist name.");
    }

    setIsLoading(true);

    try {
      if (useReelUrl) {
        if (!form.reelUrl) {
          toast.error("Please enter the Instagram Reel URL.");
          setIsLoading(false);
          return;
        }

        // Call convert reel to song
        await convertReelToSong({
          reelUrl: form.reelUrl,
          songName: form.songName,
          artistName: form.artistName,
          albumName: form.albumName,
        });

        toast.success("Reel converted and song saved successfully!");
      } else {
        // Normal upload validation
        if (!files.audioFile || !files.songImage) {
          toast.error("Please upload both audio and image files.");
          setIsLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("songName", form.songName);
        formData.append("artistName", form.artistName);
        if (form.albumName) formData.append("albumName", form.albumName);
        formData.append("audioFile", files.audioFile);
        formData.append("songImage", files.songImage);

        await createSong(formData);

        toast.success("Song added successfully!");
      }

      // Reset form and files
      setForm({ songName: "", artistName: "", albumName: "", reelUrl: "" });
      setFiles({ audioFile: null, songImage: null });
      setIsOpen(false);
    } catch (err) {
      console.error("Error adding song:", err);
      toast.error(err?.message || "Failed to add song.");
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

            {/* Toggle Upload or Reel */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="toggleReel"
                checked={useReelUrl}
                onChange={() => setUseReelUrl((v) => !v)}
              />
              <label htmlFor="toggleReel" className="text-sm">
                Convert from Instagram Reel URL
              </label>
            </div>

            {/* Common fields */}
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

            <div className="space-y-1">
              <label className="text-sm">Album Name (optional)</label>
              <input
                type="text"
                value={form.albumName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, albumName: e.target.value }))
                }
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none"
              />
            </div>

            {/* Conditional inputs */}
            {useReelUrl ? (
              <div className="space-y-1">
                <label className="text-sm">Instagram Reel URL</label>
                <input
                  type="url"
                  value={form.reelUrl}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, reelUrl: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded focus:outline-none"
                  placeholder="https://www.instagram.com/reel/..."
                />
              </div>
            ) : (
              <>
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
              </>
            )}

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
                {isLoading
                  ? useReelUrl
                    ? "Converting..."
                    : "Uploading..."
                  : useReelUrl
                  ? "Convert Reel & Add Song"
                  : "Add Song"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSongDialog;
