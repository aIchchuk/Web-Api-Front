import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";

const Header = () => {
  const { user } = useContext(AuthContext); // Assume your AuthProvider provides this

  return (
    <div className="flex items-center justify-between mb-8 ">
      <div className="flex items-center justify-center gap-2">
        <Link to="/" className="rounded-lg mr-6">
          <img src="/cover-images/11.jpg" alt="Logo" className="size-15 rounded-full hover:size-16" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 mt-1">Manage your music catalog</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-300">
          {user?.fullName || "Admin"}
        </span>
        <Link to = '/login'
          className="text-sm bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Header;
