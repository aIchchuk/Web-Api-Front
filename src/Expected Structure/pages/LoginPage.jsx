import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="h-full bg-black [&::-webkit-scrollbar]:hidden">
      <section className="flex items-center justify-center min-h-screen">
        <form
          className="w-full max-w-[420px] text-center text-slate-100
                     bg-white/5 border border-white/10 rounded-3xl p-12
                     backdrop-blur-md shadow-[0_12px_50px_rgba(0,0,0,0.35)]
                     animate-fadeInDown"
        >
          <h2 className="text-[2.2rem] mb-1 font-bold 
                         bg-gradient-to-r from-purple-400 to-blue-400 
                         bg-clip-text text-transparent">
            Login
          </h2>

          <p className="text-base text-slate-300 mb-8">
            Welcome back! Please sign in to your account.
          </p>

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3.5 mb-6 rounded-full bg-white/10
                       text-slate-100 text-base outline-none
                       shadow-inner shadow-black/10 placeholder:text-slate-400
                       focus:bg-white/20 transition-colors"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3.5 mb-6 rounded-full bg-white/10
                       text-slate-100 text-base outline-none
                       shadow-inner shadow-black/10 placeholder:text-slate-400
                       focus:bg-white/20 transition-colors"
          />

          <Link
            to="/"
            className="block w-full mt-2 bg-white text-indigo-700 
                       font-semibold text-base py-3 rounded-full 
                       shadow-[0_8px_22px_rgba(0,0,0,0.25)] 
                       transition-all hover:bg-slate-50 hover:scale-[1.04] 
                       text-center"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="block w-full mt-4 bg-white text-indigo-700 
                       font-semibold text-base py-3 rounded-full 
                       shadow-[0_8px_22px_rgba(0,0,0,0.25)] 
                       transition-all hover:bg-slate-50 hover:scale-[1.04] 
                       text-center"
          >
            Don't have an account? Register Now
          </Link>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
