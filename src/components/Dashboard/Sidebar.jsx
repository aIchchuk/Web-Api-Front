import React from 'react';

import './Sidebar.css'

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="sidebar">
      <h2>Toot</h2>
      <nav>
        <p onClick={() => onNavigate('home')}>Home</p>
        <p onClick={() => onNavigate('library')}>Library</p>
        <p onClick={() => onNavigate('playlist')}>Playlist</p>
        <p onClick={() => onNavigate('profile')}>Profile</p>
      </nav>
    </div>
  );
};

export default Sidebar;
