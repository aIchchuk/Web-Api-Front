import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import MusicPlayer from './MusicPlayer';
import MainScreen from './mainScreen';
import './Dashboard.css';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('home');
  return (
    <div className="app-container">
      <SearchBar />
      <div className="dashboard">
        <Sidebar onNavigate={setCurrentView} />
        <MainScreen currentView={currentView} />
      </div>
      <MusicPlayer />
    </div>
  );
};

export default Dashboard;
