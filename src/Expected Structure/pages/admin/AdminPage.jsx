import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { Music, Album } from "lucide-react";
import DashboardStat from "./DashboardStat";
import Header from "../../components/layout_components/Header";
import SongTabContent from "./SongTabContent";
import AlbumTabContent from "./AlbumTabContent";

const AdminPage = () => {
  const { isAdmin } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("songs");

  // Replace with real fetch calls or useEffect if needed
  useEffect(() => {
    // Fetch songs, albums, stats if required
  }, []);

  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-white p-8">
      <Header />

      <DashboardStat />

      {/* Tabs Navigation */}
      <div className="flex space-x-4 bg-zinc-800 rounded-md p-1 w-fit mt-8">
        <button
          className={`flex items-center px-4 py-2 rounded-md text-sm transition-colors ${
            activeTab === "songs"
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("songs")}
        >
          <Music className="w-4 h-4 mr-2" />
          Songs
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-md text-sm transition-colors ${
            activeTab === "albums"
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("albums")}
        >
          <Album className="w-4 h-4 mr-2" />
          Albums
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "songs" && <SongTabContent />}
        {activeTab === "albums" && <AlbumTabContent/>}
      </div>
    </div>
  );
};

export default AdminPage;
