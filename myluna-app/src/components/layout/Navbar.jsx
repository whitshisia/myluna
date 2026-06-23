import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../shared/Button';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-blush/95 backdrop-blur-md border-b border-rose-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg viewBox="0 0 30 30" className="w-8 h-8" fill="none">
            <path d="M15 26C15 26 4 20 4 12.5C4 8.36 7.36 5 11.5 5C13.24 5 14.84 5.61 16.1 6.62C17.36 5.61 18.96 5 20.7 5C24.64 5 28 8.36 28 12.5C28 20 15 26 15 26Z" fill="#D4537E" fillOpacity="0.25" stroke="#D4537E" strokeWidth="1.5"/>
            <path d="M15 22C15 22 7 17.5 7 12.5C7 9.46 9.46 7 12.5 7C13.74 7 14.88 7.44 15.77 8.18C16.66 7.44 17.8 7 19.04 7C22.04 7 24.5 9.46 24.5 12.5C24.5 17.5 15 22 15 22Z" fill="#D4537E"/>
          </svg>
          <span className="font-serif text-xl text-plum">myluna</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="text-muted hover:text-rose transition">
                Dashboard
              </Link>
              <button
                onClick={toggleTheme}
                className="text-muted hover:text-rose transition"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-muted hover:text-rose transition">
                Sign In
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-plum"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-rose-md">
          <div className="flex flex-col gap-3">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-muted hover:text-rose transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="text-muted hover:text-rose transition text-left"
                >
                  {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-red-500 hover:text-red-600 transition text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-muted hover:text-rose transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button fullWidth>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}