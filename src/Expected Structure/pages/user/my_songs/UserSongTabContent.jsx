import { Music } from "lucide-react";
import UserSongTable from "./UserSongTable";
import AddUserSongDialog from "./AddUserSongDialog";
const UserSongTabContent = () => {
  return (
    <div className="h-[350px] bg-zinc-900 rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-emerald-500">
            <Music className="w-5 h-5" />
            Your Songs Library
          </h2>
          <p className="text-zinc-400 text-sm">Manage your music tracks</p>
        </div>
        <AddUserSongDialog></AddUserSongDialog>
      </div>
      <div>
        <UserSongTable />
      </div>
    </div>
  );
};

export default UserSongTabContent;
