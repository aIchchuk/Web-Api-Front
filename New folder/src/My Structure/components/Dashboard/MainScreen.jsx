import React from 'react';
import HomeView from './pages/HomeView';
import LibraryView from './pages/LibraryView';
import PlaylistView from './pages/PlaylistView';
import ProfileView from './pages/ProfileView';

import './MainScreen.css'


const MainScreen = ({ currentView }) => {
  const renderView = () => {
    switch (currentView) {
      case 'library':
        return <LibraryView />;
      case 'playlist':
        return <PlaylistView />;
      case 'profile':
        return <ProfileView/>;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="main-screen">
      {renderView()}
    </div>
  );
};

export default MainScreen;
