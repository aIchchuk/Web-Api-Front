import React from 'react';
import { FaSearch } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
//   const navigate = useNavigate();

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

      {/* <div className="absolute right-8 flex items-center gap-3 mr-20">
        <div className="w-[38px] h-[38px] bg-gray-500 rounded-full overflow-hidden border-2 border-white">
          <img
            src="/path-to-profile.jpg"
            alt="Profile"
            className="w-full h-full object-cover block"
          />
        </div>
        <button
          onClick={() => navigate('/my-account')}
          className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-black hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all"
        >
          My Account
        </button>
      </div> */}
    </div>
  );
};

export default Searchbar;
