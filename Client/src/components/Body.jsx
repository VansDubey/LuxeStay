import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Usercontext';
import Image from './Image';
import MidSec from './Midsec';
import Footer from './Footer';
import Preview from './Preview';
import { Moon, User } from "lucide-react";

const Body = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {/* 🌐 Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏨</span>
            <Link to="/" className="group">
              <h1 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                Elegancia
              </h1>
              <p className="text-sm text-gray-500 mt-1 italic">More than a stay, an experience.</p>
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-10 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
            </li>
            <li>
              <Link to="/accounts/book" className="hover:text-blue-600 transition-colors duration-200">Places</Link>
            </li>
            <li>
              <Link to="/accounts/booking" className="hover:text-blue-600 transition-colors duration-200">Bookings</Link>
            </li>
            <li>
              <Link to="/accounts/places" className="hover:text-blue-600 transition-colors duration-200">Accommodations</Link>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition">
              <Moon size={20} />
            </button>
            <Link
              to={user ? "/accounts/profile" : "/Login"}
              className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <User size={20} />
            </Link>
          </div>
        </div>
      </nav>

      {/* 🔽 Page Content */}
      <div className="pt-[80px] scroll-smooth">
        <Image />
        <Preview />
        <MidSec />
        <Footer />
      </div>
    </>
  );
};

export default Body;
