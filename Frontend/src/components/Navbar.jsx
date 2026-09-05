import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Show, UserButton } from '@clerk/react';
import { Leaf, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500 rounded-xl text-white shadow-sm">
              <Leaf className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              FoodRescue<span className="text-emerald-600">Hub</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors border-b-2 py-5 px-1 ${
                isActive('/')
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Home
            </Link>
            <Link
              to="/#about"
              className="text-sm font-medium transition-colors border-b-2 border-transparent py-5 px-1 text-slate-600 hover:text-slate-900 hover:border-slate-300"
            >
              How It Works
            </Link>
          </nav>

          {/* Auth Controls */}
          <div className="flex items-center space-x-3">
            <Show when="signed-out">
              <Link
                to="/signin"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center space-x-1.5 ${
                  isActive('/signin')
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/signup"
                className={`px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors flex items-center space-x-1.5 ${
                  isActive('/signup')
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </Link>
            </Show>

            <Show when="signed-in">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10 border-2 border-emerald-500 rounded-full'
                  }
                }}
              />
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
}
