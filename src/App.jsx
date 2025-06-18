import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar from './components/Landing Page/Navbar';
import Hero from './components/Landing Page/Hero';
import Features from './components/Landing Page/Features';
import Artists from './components/Landing Page/Artists';
import Preview from './components/Landing Page/Preview';
import Testimonials from './components/Landing Page/Testimonials';
import CTA from './components/Landing Page/CTA';
import Footer from './components/Landing Page/Footer';

import Login from './components/Login/Login';
import Register from './components/Register/register';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Features />
              <Artists />
              <Preview />
              <Testimonials />
              <CTA />
              <Footer />
            </>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard Page
        <Route path="/dashboard" element={<Home />} /> */}

        {/* Navigation Side bar Page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
