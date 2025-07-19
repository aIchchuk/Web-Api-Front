import React from 'react';
import { PlayerProvider } from './Expected Structure/context/PlayerContext';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './Expected Structure/layouts/MainLayout';
import HomePage from './Expected Structure/pages/HomePage';
import AlbumPage from './Expected Structure/pages/AlbumPage';
import Player from './Expected Structure/components/layout_components/Player';
// other imports...

const App = () => (
  <PlayerProvider>
    <div className="h-screen bg-black">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
          {/* other routes */}
        </Route>
      </Routes>

      {/* Player placed here so it’s always available */}
      <Player />
    </div>
  </PlayerProvider>
);

export default App;
