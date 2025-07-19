import React, { useEffect } from "react";
import { useSong } from "../hooks/useSong";
import FeaturedSection from "../components/layout_components/FeaturedSection";
import SectionGrid from "../components/layout_components/SectionGrid";

const HomePage = () => {
  const {
    featuredSong,
    madeForYouSong,
    trendingSong,
    isLoading,
    fetchFeaturedSong,
    fetchMadeForYouSong,
    fetchTrendingSong,
  } = useSong();

  useEffect(() => {
    fetchFeaturedSong();
    fetchMadeForYouSong();
    fetchTrendingSong();
  }, []);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b bg-neutral-900 overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <div className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6 overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good afternoon</h1>

          <FeaturedSection song={featuredSong} isLoading={isLoading} />

          <div className="space-y-8 mt-10 ">
            <SectionGrid title="Made For You" song={madeForYouSong} isLoading={isLoading} />
            <SectionGrid title="Trending" song={trendingSong} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
