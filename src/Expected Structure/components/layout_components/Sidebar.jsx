import React from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, Library, MessageCircleIcon } from 'lucide-react';
import PlaylistSkeleton from '../skeletons/PlaylistSkeleton';

const Sidebar = () => {
    const isLoading = true;
  return (
    <div className="h-full flex flex-col">
      {/* Navigation Menu */}
      <div className="rounded-md w-full outline-1 mb-4">
        <Link
          to="/"
          className="flex items-center gap-4 rounded-md px-3 py-2 mb-3 text-sm font-medium text-white hover:bg-zinc-800 hover:text-white transition-all duration-150"
        >
          <HomeIcon className="size-5" />
          <span className="hidden md:inline">Home</span>
        </Link>

        <Link
          to="/chat"
          className="flex items-center gap-4 rounded-md px-3 py-2 mt-3 text-sm font-medium text-white hover:bg-zinc-700 hover:text-white transition-all duration-150"
        >
          <MessageCircleIcon className="size-5" />
          <span className="hidden md:inline">Messages</span>
        </Link>
      </div>

      {/* Playlists Section */}
      <div className="flex-1 rounded-md w-full  mt-4 outline-1">
        <div className="flex items-center gap-4 rounded-md px-3 py-2 mb-3 text-lg font-medium text-white " >
          <Library className="size-6" />
          <span className="hidden md:inline">Playlists</span>
        </div>

        {/* You can add a scrollable playlist list here later */}
        <div className=" h-[365px] mt-3 overflow-y-auto rounded-md [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
          
          <div className = ' space-y-2 '>
            {isLoading ? (
                <PlaylistSkeleton></PlaylistSkeleton>
            ) : (
                <>
                    <div className="p-2 rounded hover:bg-white hover:text-black transition">Chill Vibes</div>
                    <div className="p-2 rounded hover:bg-white hover:text-black transition">Chill Vibes</div>
                </>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Sidebar
