import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Wave = ({ flip = false }) => (
  <div className={`overflow-hidden leading-[0] ${flip ? 'rotate-180' : 'rotate-0'}`}>
    <svg
      className="relative block w-full h-[80px]"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#0a0a0a"
        d="M0,128L48,122.7C96,117,192,107,288,128C384,149,480,203,576,218.7C672,235,768,213,864,192C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white min-h-screen font-sans transition-all duration-300">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/50 shadow-md flex justify-between items-center px-8 py-4 border-b border-neutral-800">
        <div className="text-2xl font-bold tracking-tight text-white select-none cursor-default">
          Toot <span role="img" aria-label="music">🎵</span>
        </div>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><a href="#features" className="hover:text-indigo-400 transition-all duration-200">Features</a></li>
          <li><a href="#artists" className="hover:text-indigo-400 transition-all duration-200">Artists</a></li>
          <li><a href="#access-now" className="hover:text-indigo-400 transition-all duration-200">Access now</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="text-center py-28 max-w-3xl mx-auto px-6 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 text-transparent bg-clip-text">
          Stream Music Anytime, Anywhere
        </h1>
        <p className="mb-10 text-lg text-neutral-300">
          Experience seamless sound and discover new artists every day with Toot.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md"
        >
          Get Started
        </button>
      </section>

      <Wave />

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-3xl font-semibold mb-16">Why Choose Toot?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: 'High Quality', desc: 'Crystal-clear audio streaming at your fingertips.' },
            { title: 'Curated Playlists', desc: 'Discover playlists tailored to your taste.' },
            { title: 'Offline Mode', desc: 'Download tracks and listen without internet.' },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow hover:shadow-lg transition-all border border-white/10">
              <h3 className="text-xl font-semibold mb-3 text-indigo-300">{title}</h3>
              <p className="text-neutral-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Wave flip />

      {/* Artists */}
      <section id="artists" className="py-24 px-6 max-w-6xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-3xl font-semibold mb-16">Featured Artists</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { name: 'Nova', desc: 'Electronic fusion vibes' },
            { name: 'Luma', desc: 'Soothing vocals and indie pop' },
            { name: 'Hexa', desc: 'High energy EDM beats' },
          ].map(({ name, desc }) => (
            <div key={name} className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow hover:shadow-lg transition-all border border-white/10">
              <h3 className="text-indigo-400 text-xl font-semibold mb-2">{name}</h3>
              <p className="text-neutral-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Wave />

      {/* Preview */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-3xl font-semibold mb-10">Preview</h2>
        <img
          src="https://i.pinimg.com/originals/92/23/43/9223430d43fda43bb37acadaa424e767.gif"
          alt="Toot App Preview"
          className="rounded-xl shadow-xl mx-auto max-w-full"
        />
      </section>

      <Wave flip />

      {/* Testimonials */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-3xl font-semibold mb-16">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { quote: 'Toot has changed how I listen to music!', user: 'Alex J.' },
            { quote: 'Amazing playlists and discovery options.', user: 'Jamie S.' },
            { quote: 'Offline mode is a lifesaver!', user: 'Taylor R.' },
          ].map(({ quote, user }, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow hover:shadow-lg transition-all border border-white/10 text-neutral-300">
              <p className="italic mb-4">"{quote}"</p>
              <span className="font-semibold not-italic text-white">- {user}</span>
            </div>
          ))}
        </div>
      </section>

      <Wave />

      {/* CTA */}
      <section id="access-now" className="py-24 px-6 max-w-3xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-3xl font-semibold mb-6">Join Millions of Listeners</h2>
        <p className="mb-8 text-neutral-300 text-lg max-w-lg mx-auto">
          Get Toot on your device today.
        </p>
        <Link to='/login' className="bg-indigo-600 hover:bg-indigo-700 font-semibold px-10 py-3 rounded-full shadow-md transition-all duration-300">
          Access Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 text-neutral-500 text-center py-6 text-sm border-t border-white/10">
        &copy; {new Date().getFullYear()} Toot Music. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
