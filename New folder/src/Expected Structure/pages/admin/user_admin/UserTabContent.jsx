import { User } from "lucide-react";
import UserTable from "./UserTable";
// import AddUserDialog from "./AddUserDialog";

const UserTabContent = () => {
  return (
    <div className="bg-zinc-900 rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-orange-500">
            <User className="w-5 h-5" />
            Users Library
          </h2>
          <p className="text-zinc-400 text-sm">Manage your users</p>
        </div>
        {/* <AddUserDialog /> */}
      </div>
      <div>
        <UserTable />
      </div>
    </div>
  );
};

export default UserTabContent;
