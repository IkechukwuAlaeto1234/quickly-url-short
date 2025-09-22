import React, { useState } from 'react';
import { User } from '../types';
import { LinkIcon } from './icons/LinkIcon';
import { View } from '../App';
import { CloseIcon } from './icons/CloseIcon';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onLogin: () => void;
  view: string;
  handleSetView: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onLogin, view, handleSetView }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (targetView: View) => {
    handleSetView(targetView);
    setMobileMenuOpen(false);
  };

  const NavItems = () => (
    <>
      {user && (
        <button
            onClick={() => handleNavClick('dashboard')}
            className={`font-semibold transition-colors px-4 py-2 text-sm rounded-md ${view === 'dashboard' ? 'text-blue-600 bg-blue-100' : 'text-slate-700 hover:text-blue-600'}`}
        >
            Dashboard
        </button>
      )}
      <button
          onClick={() => handleNavClick('features')}
          className={`font-semibold transition-colors px-4 py-2 text-sm rounded-md ${view === 'features' ? 'text-blue-600 bg-blue-100' : 'text-slate-700 hover:text-blue-600'}`}
      >
          Features
      </button>
      <button
          onClick={() => handleNavClick('blog')}
          className={`font-semibold transition-colors px-4 py-2 text-sm rounded-md ${['blog', 'blogPost'].includes(view) ? 'text-blue-600 bg-blue-100' : 'text-slate-700 hover:text-blue-600'}`}
      >
          Blog
      </button>
      <button
          onClick={() => handleNavClick('about')}
          className={`font-semibold transition-colors px-4 py-2 text-sm rounded-md ${view === 'about' ? 'text-blue-600 bg-blue-100' : 'text-slate-700 hover:text-blue-600'}`}
      >
          About Us
      </button>
    </>
  );

  return (
    <>
    <header className="w-full max-w-5xl mx-auto flex items-center justify-between p-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={() => handleNavClick(user ? 'dashboard' : 'landing')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Quickly</h1>
            </div>
        </button>
      </div>
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-2">
        <NavItems />
        {user ? (
          <div className="flex items-center gap-4 ml-4">
            <span className="text-slate-600 text-sm hidden sm:block">{user.email}</span>
            <button
              onClick={onLogout}
              className="font-semibold text-slate-700 hover:text-blue-600 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 ml-4">
            <button 
                onClick={onLogin}
                className="font-semibold text-slate-700 hover:text-blue-600 transition-colors px-4 py-2 text-sm">
              Login
            </button>
            <button
                onClick={onLogin}
                className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 text-sm">
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Nav Button */}
      <div className="md:hidden">
          <button id="menu-btn" className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
          </button>
      </div>
    </header>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden animate-fade-in-fast">
            <div className="absolute top-4 right-4 p-2 sm:right-6 sm:top-4">
                <button onClick={() => setMobileMenuOpen(false)}>
                    <CloseIcon className="w-6 h-6 text-slate-800" />
                    <span className="sr-only">Close menu</span>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center h-full gap-6 text-2xl font-bold">
              <NavItems />
              <hr className="w-2/3 mx-auto" />
              {user ? (
                <div className="flex flex-col items-center gap-6">
                  <span className="text-slate-600 text-lg">{user.email}</span>
                  <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <button onClick={() => { onLogin(); setMobileMenuOpen(false); }} className="font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                    Login
                  </button>
                  <button onClick={() => { onLogin(); setMobileMenuOpen(false); }} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-md hover:bg-blue-700 transition-all duration-200">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
        </div>
    )}
    </>
  );
};