import { Album } from "lucide-react";
import UserAlbumTable from "./UserAlbumTable";
import AddUserAlbumDialog from "./AddUserAlbumDialog";

const UserAlbumTabContent = () => {
  return (
    <div className="h-[350px] bg-zinc-900 rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-indigo-400">
            <Album className="w-5 h-5" />
            Your Albums Library
          </h2>
          <p className="text-zinc-400 text-sm">Manage your album collection</p>
        </div>
        <AddUserAlbumDialog/>
      </div>
      <div>
        <UserAlbumTable />
      </div>
    </div>
  );
};

export default UserAlbumTabContent;
