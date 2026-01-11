import React, { useState, useContext } from 'react';
import { Moon, User, Menu, X, Globe, LogOut } from "lucide-react";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/Usercontext';
import Button from './ui/Button';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext); // Assuming setUser is available for logout
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group z-50">
          <div className="bg-primary-500 rounded-lg p-1.5 text-white group-hover:bg-primary-600 transition-colors">
            <Globe size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 leading-none tracking-tight group-hover:text-primary-600 transition-colors">
              LuxeStay
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8 text-secondary-600 font-medium text-sm">
          <li>
            <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/accounts/book" className="hover:text-primary-500 transition-colors">Places</Link>
          </li>
          <li>
            <Link to="/accounts/places" className="hover:text-primary-500 transition-colors">My Accommodations</Link>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-secondary-100 text-secondary-600 transition-colors">
            <Moon size={20} />
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/accounts/booking" className="text-secondary-600 hover:text-primary-500 font-medium text-sm">
                My Bookings
              </Link>
              <Link
                to="/accounts/profile"
                className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-secondary-200 hover:shadow-md transition-all group"
              >
                <div className="bg-secondary-100 p-1 rounded-full text-secondary-500 group-hover:text-primary-500">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium text-secondary-700 truncate max-w-[100px]">{user.name}</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button to="/login" variant="ghost" size="sm">Log in</Button>
              <Button to="/register" variant="primary" size="sm">Sign up</Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 p-2 text-secondary-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col pt-24 px-8 transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col space-y-6 text-lg font-medium text-secondary-800">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/accounts/book" onClick={() => setIsMenuOpen(false)}>Places</Link>
            <Link to="/accounts/places" onClick={() => setIsMenuOpen(false)}>Accommodations</Link>
            <Link to="/accounts/booking" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
            <hr className="border-secondary-100" />
            {user ? (
              <Link to="/accounts/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-primary-600">
                <User size={20} /> Profile ({user.name})
              </Link>
            ) : (
              <div className="flex flex-col gap-3">
                <Button to="/login" variant="outline" size="lg" onClick={() => setIsMenuOpen(false)} className="w-full">Log in</Button>
                <Button to="/register" variant="primary" size="lg" onClick={() => setIsMenuOpen(false)} className="w-full">Sign up</Button>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar