import React from 'react';
import './Searchbar.css';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
  return (
    <div className="search-bar">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search music, artists, albums..."
          className="search-input"
        />
      </div>

      <div className="Profile">
        <div className="profile-pic">
          <img src="/path-to-profile.jpg" alt="Profile" />
        </div>
        <button>My Account</button>
      </div>
    </div>
  );
};

export default Searchbar;
