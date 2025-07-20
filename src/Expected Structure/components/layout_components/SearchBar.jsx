import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProvider';

const Searchbar = () => {
  const { isAdmin, user } = useContext(AuthContext);

  return (
    <div className="fixed top-0 left-0 right-0 mt-4 mb-4 z-[200] flex justify-center backdrop-blur-md">
      <div className="flex items-center w-full max-w-[720px] bg-white/10 rounded-full px-4 py-2 transition-shadow hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
        <FaSearch className="text-gray-400 text-sm mr-3" />
        <input
          type="text"
          placeholder="Search music, artists, albums..."
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-sm font-normal"
        />
      </div>

      <div className="absolute right-10 flex items-center gap-3 mr-20">
        {isAdmin ? (
          <Link
            to="/admin"
            className="px-4 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-neutral-800 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all"
          >
            Admin Panel
          </Link>
        ) : user ? (
          <Link
            to={`/user/${user.id}`}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-neutral-800 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all"
          >
            My Account
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Searchbar;
