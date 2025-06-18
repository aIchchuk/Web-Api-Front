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
    </div>
  );
};

export default Searchbar;
