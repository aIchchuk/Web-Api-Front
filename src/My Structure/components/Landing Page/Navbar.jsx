import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
      <div className="logo">Toot<span>🎵</span></div>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#artists">Artists</a></li>
        <li><a href="#download">Download</a></li>
      </ul>
      </nav>
    </>
  )
}

export default Navbar