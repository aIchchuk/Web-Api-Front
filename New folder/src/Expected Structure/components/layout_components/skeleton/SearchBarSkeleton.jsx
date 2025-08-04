import React, { useState } from 'react';

const SearchBarSkeleton = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 mt-4 mb-4 z-[200] flex flex-col items-center backdrop-blur-md">
      {/* Search Bar Skeleton */}
      <div className="flex items-center w-full max-w-[720px] bg-white/10 rounded-full px-4 py-2 animate-pulse">
        <div className="w-4 h-4 bg-gray-400/50 rounded-full mr-3" />
        <input
          type="text"
          placeholder="Search music, artists, albums..."
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-sm font-normal"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {/* Dropdown Skeleton (only when focused) */}
      {isFocused && (
        <div className="w-full max-w-[720px] mt-1 bg-neutral-900 text-black rounded-md shadow-lg z-50 max-h-60 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center px-4 py-2 gap-3 animate-pulse"
            >
              <div className="w-6 h-6 bg-gray-300 rounded" />
              <div className="flex-1">
                <div className="w-4/5 h-3 bg-gray-300 rounded mb-1" />
                <div className="w-3/5 h-3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarSkeleton;
