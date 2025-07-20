import { Album } from "lucide-react";
// import AlbumsTable from "./AlbumsTable";
// import AddAlbumDialog from "./AddAlbumDialog";

const AlbumTabContent = () => {
  return (
    <div className="bg-zinc-900 rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-violet-500">
            <Album className="w-5 h-5" />
            Albums Library
          </h2>
          <p className="text-zinc-400 text-sm">Manage your albums</p>
        </div>
        {/* <AddAlbumDialog /> */}
      </div>
      <div>
        {/* <AlbumsTable /> */}
      </div>
    </div>
  );
};

export default AlbumTabContent;
