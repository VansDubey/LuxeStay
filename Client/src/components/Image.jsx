import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Users, Search } from "lucide-react";
import img1 from "../Images/Img1.jpg";
import img2 from "../Images/Img2.jpg";
import img3 from "../Images/Img3.jpg";

const images = [img1, img2, img3];

const Image = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute w-full h-full">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Background ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Find Your Perfect Stay
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
          Discover luxury hotels worldwide with verified reviews and competitive pricing
        </p>

        {/* Search Box */}
        <div className="relative mt-10 w-full max-w-5xl mx-auto bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-5 md:p-6 border border-white/30">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center bg-white/70 hover:bg-white transition rounded-lg px-3 py-2 w-full md:w-1/3">
              <MapPin className="text-gray-600 mr-2" size={20} />
              <input
                type="text"
                placeholder="Where to?"
                className="w-full bg-transparent placeholder-gray-600 text-gray-800 outline-none"
              />
            </div>

            <div className="flex items-center bg-white/70 hover:bg-white transition rounded-lg px-3 py-2 w-full md:w-1/4">
              <Calendar className="text-gray-600 mr-2" size={20} />
              <input
                type="text"
                placeholder="Check-in"
                className="w-full bg-transparent placeholder-gray-600 text-gray-800 outline-none"
              />
            </div>

            <div className="flex items-center bg-white/70 hover:bg-white transition rounded-lg px-3 py-2 w-full md:w-1/4">
              <Calendar className="text-gray-600 mr-2" size={20} />
              <input
                type="text"
                placeholder="Check-out"
                className="w-full bg-transparent placeholder-gray-600 text-gray-800 outline-none"
              />
            </div>

            <div className="flex items-center bg-white/70 hover:bg-white transition rounded-lg px-3 py-2 w-full md:w-1/4">
              <Users className="text-gray-600 mr-2" size={20} />
              <input
                type="text"
                placeholder="Guests"
                className="w-full bg-transparent placeholder-gray-600 text-gray-800 outline-none"
              />
            </div>
          </div>

          <button className="mt-6 w-full md:w-auto md:ml-auto bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg py-3 px-8 flex justify-center items-center shadow-lg">
            <Search className="mr-2" size={18} /> Search Hotels
          </button>
        </div>
      </div>
    </div>
  );
};

export default Image;
