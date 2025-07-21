import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { Music, Album, User } from "lucide-react";
import DashboardStat from "../../components/layout_components/DashboardStat";
import Header from "../../components/layout_components/Header";
import SongTabContent from "./song_admin/SongTabContent";
import AlbumTabContent from "./album_admin/AlbumTabContent";
import UserTabContent from "./UserTabContent";


const AdminPage = () => {
  const { isAdmin } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("songs");

  // Replace with real fetch calls or useEffect if needed
  useEffect(() => {
    
  }, []);

  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-white p-9 flex flex-col gap-5">
      <div >
        <div className="h-[100px] p-4 pr-8 pl-8 mb-4 bg-neutral-900 rounded-2xl ">
          <Header />
        </div>
        
        <div className=" h-[550px] p-4 mt-4 bg-neutral-900 rounded-2xl ">
          <DashboardStat />

          {/* Tabs Navigation */}
          <div>
            <div className="flex space-x-4 bg-zinc-800 rounded-md w-fit mt-4 ">
              <button
                className={`flex items-center px-4 py-2 rounded-md text-sm transition-colors ${
                  activeTab === "song"
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("song")}
              >
                <Music className="w-4 h-4 mr-2" />
                Songs
              </button>
              <button
                className={`flex items-center px-4 py-2 rounded-md text-sm transition-colors ${
                  activeTab === "album"
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("album")}
              >
                <Album className="w-4 h-4 mr-2" />
                Albums
              </button>
              <button
                className={`flex items-center px-4 py-2 rounded-md text-sm transition-colors ${
                  activeTab === "user"
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("user")}
              >
                <User className="w-4 h-4 mr-2" />
                Users
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === "song" && <SongTabContent />}
              {activeTab === "album" && <AlbumTabContent/>}
              {activeTab === "user" && <UserTabContent/>}
            </div>
          </div>
          
        </div>


      </div>

    </div>
  );
};

export default AdminPage;
