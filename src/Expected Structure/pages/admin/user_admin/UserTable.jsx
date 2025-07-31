import { useEffect } from "react";
import { Calendar, Trash2 } from "lucide-react";
import { useUser } from "../../../hooks/useUser";

const UserTable = () => {
  const { users, isLoading, error, deleteUser, fetchAllUsers } = useUser();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading users...</div>
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
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Registered At</th>
            <th className="p-2 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-zinc-800/50">
              <td className="p-2 font-medium">{user.fullName}</td>
              <td className="p-2 text-sm text-zinc-300">{user.email}</td>
              <td className="p-2 text-zinc-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(user.createdAt).toISOString().split("T")[0]}
                </div>
              </td>
              <td className="p-2 text-right">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded p-1"
                  aria-label={`Delete ${user.name}`}
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

export default UserTable;
