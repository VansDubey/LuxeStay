import React, { useState, useContext } from 'react';
import { Moon, User, Menu, X, Globe, LogOut, ChevronDown } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Usercontext';
import Button from './ui/Button';
import axios from 'axios';

const Navbar = () => {
  const { user, setuser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    await axios.post('http://localhost:3000/logout');
    setuser(null);
    navigate('/');
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-secondary-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3 md:py-4 flex justify-between items-center">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group z-50 flex-shrink-0">
            <div className="bg-primary-500 rounded-lg p-1.5 text-white group-hover:bg-primary-600 transition-colors duration-200">
              <Globe size={24} strokeWidth={2.5} className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-secondary-900 leading-none tracking-tight group-hover:text-primary-600 transition-colors duration-200 hidden sm:block">
              LuxeStay
            </h1>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
          <ul className="hidden lg:flex items-center space-x-8 text-secondary-600 font-medium text-sm">
            <li>
              <Link
                to="/accounts/book"
                className="relative py-2 px-1 hover:text-primary-500 transition-colors duration-200 group"
              >
                Explore Places
                <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>

            {user?.role === 'admin' && (
              <li>
                <Link
                  to="/accounts/places"
                  className="relative py-2 px-1 hover:text-primary-500 transition-colors duration-200 group"
                >
                  Manage Accommodations
                  <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </li>
            )}

            {user?.role === 'user' && (
              <li>
                <Link
                  to="/accounts/booking"
                  className="relative py-2 px-1 hover:text-primary-500 transition-colors duration-200 group"
                >
                  My Bookings
                  <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </li>
            )}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            <button
              className="p-2.5 rounded-full hover:bg-secondary-100 text-secondary-600 hover:text-secondary-800 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <Moon size={20} />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-full border border-secondary-200 hover:shadow-md transition-all duration-200 group bg-white/50 hover:bg-white"
                >
                  <div className="bg-secondary-100 p-1 rounded-full text-secondary-500 group-hover:text-primary-500 transition-colors duration-200">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium text-secondary-700 truncate max-w-[100px]">{user.name}</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Desktop Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border border-secondary-200 shadow-lg animate-slide-in-down z-50">
                    <Link
                      to="/accounts/profile"
                      className="block px-4 py-3 text-sm font-medium text-secondary-700 hover:bg-secondary-50 hover:text-primary-600 transition-colors duration-200 rounded-t-xl first:rounded-t-xl"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-b-xl border-t border-secondary-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button to="/login" variant="ghost" size="sm" className="text-secondary-600 hover:text-primary-600">Log in</Button>
                <Button to="/register" variant="primary" size="sm">Sign up</Button>
              </div>
            )}
          </div>

          {/* Mobile/Tablet Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              className="p-2.5 rounded-full hover:bg-secondary-100 text-secondary-600 transition-colors duration-200 md:block hidden"
              aria-label="Toggle theme"
            >
              <Moon size={20} />
            </button>
            <button
              className="lg:hidden p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)} />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-white z-40 flex flex-col pt-24 px-6 transition-transform duration-300 lg:hidden transform ${
          isMenuOpen ? 'translate-x-0 animate-slide-in-left' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-2 flex-1">
          <Link
            to="/accounts/book"
            onClick={() => setIsMenuOpen(false)}
            className="py-3 px-4 text-lg font-medium text-secondary-700 hover:bg-secondary-50 hover:text-primary-600 transition-all duration-200 rounded-lg"
          >
            Explore Places
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/accounts/places"
              onClick={() => setIsMenuOpen(false)}
              className="py-3 px-4 text-lg font-medium text-secondary-700 hover:bg-secondary-50 hover:text-primary-600 transition-all duration-200 rounded-lg"
            >
              Manage Accommodations
            </Link>
          )}

          {user?.role === 'user' && (
            <Link
              to="/accounts/booking"
              onClick={() => setIsMenuOpen(false)}
              className="py-3 px-4 text-lg font-medium text-secondary-700 hover:bg-secondary-50 hover:text-primary-600 transition-all duration-200 rounded-lg"
            >
              My Bookings
            </Link>
          )}

          <div className="py-2 my-2 border-t border-secondary-100" />

          {user ? (
            <>
              <Link
                to="/accounts/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-4 text-lg font-medium text-primary-600 hover:bg-primary-50 transition-all duration-200 rounded-lg"
              >
                <User size={20} /> Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 py-3 px-4 text-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-200 rounded-lg"
              >
                <LogOut size={20} /> Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-auto pb-6">
              <Button to="/login" variant="outline" size="lg" onClick={() => setIsMenuOpen(false)} className="w-full">
                Log in
              </Button>
              <Button to="/register" variant="primary" size="lg" onClick={() => setIsMenuOpen(false)} className="w-full">
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;