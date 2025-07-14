import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero text-center py-16 bg-gradient-to-br from-indigo-800 to-indigo-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Stream Music Anytime, Anywhere</h1>
      <p className="mb-6 text-lg">Experience seamless sound and discover new artists every day with Toot.</p>
      <button
        onClick={() => navigate('/login')}
        className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-full text-lg font-medium"
      >
        Get Started
      </button>
    </section>
  );
};

export default Hero;
