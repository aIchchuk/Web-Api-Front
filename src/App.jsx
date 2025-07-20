import React from 'react';
import { PlayerProvider } from './Expected Structure/context/PlayerContext';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './Expected Structure/layouts/MainLayout';
import HomePage from './Expected Structure/pages/HomePage';
import AlbumPage from './Expected Structure/pages/AlbumPage';
import Player from './Expected Structure/components/layout_components/Player';
import LoginPage from './Expected Structure/pages/LoginPage';
import RegisterPage from './Expected Structure/pages/RegisterPage';
import AdminPage from './Expected Structure/pages/admin/AdminPage';
import UserPage from './Expected Structure/pages/user/Userpage';
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

        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path= '/admin' element={<AdminPage />} ></Route>
        <Route path= '/user/:userId' element={<UserPage/>}></Route>
      </Routes>

      {/* Player placed here so it’s always available */}
      <Player />
    </div>
  </PlayerProvider>
);

export default App;
