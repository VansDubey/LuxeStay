import React from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";

export default function LuxeStay() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🏨</span>
          <h1 className="text-2xl font-semibold">LuxeStay</h1>
        </div>
        <div className="flex space-x-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600">Explore</a>
          <a href="#" className="hover:text-blue-600">My Bookings</a>
          
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">🌙</button>
          <button className="p-2 rounded-full hover:bg-gray-100">👤</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative flex-1 bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501117716987-c8e2aeb6f22b?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="bg-black/50 absolute inset-0" />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover luxury hotels worldwide with verified reviews and competitive pricing
          </p>
        </div>

        {/* Search Box */}
        <div className="relative z-10 mt-8 w-11/12 md:w-3/4 lg:w-2/3 bg-white rounded-2xl shadow-lg p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-1/3">
              <MapPin className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Where to?"
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-1/4">
              <Calendar className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-1/4">
              <Calendar className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-1/4">
              <Users className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Guests"
                className="w-full outline-none"
              />
            </div>
          </div>

          <button className="mt-4 md:mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 flex justify-center items-center">
            <Search className="mr-2" size={18} /> Search Hotels
          </button>
        </div>
      </div>
    </div>
  );
}
