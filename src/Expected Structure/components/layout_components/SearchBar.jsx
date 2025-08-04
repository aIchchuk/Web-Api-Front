import React, { useContext, useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProvider';
import SearchBarSkeleton from '../layout_components/skeleton/SearchBarSkeleton';
import { axiosInstance } from '../../api/api';
import { usePlayer } from '../../hooks/usePlayer';

const Searchbar = () => {
  const { isAdmin, user } = useContext(AuthContext);
  const { playSong, playAlbum } = usePlayer();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const isLoading = false;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        axiosInstance
          .get(`/search/suggestions?q=${encodeURIComponent(query.trim())}`)
          .then(res => {
            setSuggestions(res.data);
            setShowDropdown(true);
          })
          .catch(() => {
            setSuggestions([]);
            setShowDropdown(false);
          });
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (item) => {
    setQuery('');
    setShowDropdown(false);

    if (item.type === 'song') {
      playSong([item], 0);
    } else if (item.type === 'album') {
      if (item.songs && item.songs.length > 0) {
        playAlbum(item.songs, 0);
      } else {
        alert('Album has no songs!');
      }
    }
  };

  if (isLoading) return <SearchBarSkeleton />;

  return (
    <div className="fixed top-0 left-0 right-0 mt-4 mb-4 z-[200] flex justify-center backdrop-blur-md">
      <div className="relative w-full max-w-[720px]">
        <div className="flex items-center bg-white/10 rounded-full px-4 py-2 transition-shadow hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
          <FaSearch className="text-gray-400 text-sm mr-3" />
          <input
            type="text"
            placeholder="Search music, artists, albums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-sm font-normal"
          />
        </div>

        {showDropdown && suggestions.length > 0 && (
          <div className="w-full max-w-[720px] mt-1 bg-neutral-900 text-black rounded-md shadow-lg z-50 max-h-60 overflow-hidden">
            {suggestions.map((item) => (
              <div
                key={item.id}
                className="flex items-center px-4 py-2 gap-3 cursor-pointer transition hover:bg-neutral-800"
                onClick={() => handleSelect(item)}
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.type.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
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
