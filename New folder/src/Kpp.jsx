import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar from './My Structure/components/Landing Page/Navbar';
import Hero from './My Structure/components/Landing Page/Hero';
import Features from './My Structure/components/Landing Page/Features';
import Artists from './My Structure/components/Landing Page/Artists';
import Preview from './My Structure/components/Landing Page/Preview';
import Testimonials from './My Structure/components/Landing Page/Testimonials';
import CTA from './My Structure/components/Landing Page/CTA';
import Footer from './My Structure/components/Landing Page/Footer';

import Login from './My Structure/components/Login/Login';
import Register from './My Structure/components/Register/register';
import Dashboard from './My Structure/components/Dashboard/Dashboard';
import MyAccount from './My Structure/components/Dashboard/Profile/MyAccount';

function Kpp() {
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

        <Route path="/my-account" element={<MyAccount />} />

        {/* Navigation Side bar Page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default Kpp;
