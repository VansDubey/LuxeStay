import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/Usercontext';
import HeroSection from '../../components/HeroSection';
import MidSec from '../../components/Midsec';
import Footer from '../../components/Footer';
import ListingCard from '../../components/ListingCard';
import Navbar from '../../components/Navbar';

const Body = () => {
  const { user } = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all places (assuming this endpoint exists and returns public places)
    // If not, we might need to adjust based on backend API capabilities.
    // Using user-places as fallback if public endpoint fails or is same
    // But typically for homepage we want ALL places.
    // Let's try /places first.
    axios.get('http://localhost:3000/places')
      .then(response => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch places", err);
        // Fallback or empty state
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-secondary-50 min-h-screen flex flex-col">
      <Navbar /> {/* Ensure Navbar is here if not in Layout */}

      {/* 🔽 Page Content */}
      <div className="flex-grow pt-0"> {/* Removed pt-[80px] because Hero handles it or is full screen */}

        <HeroSection />

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-secondary-900">Featured Places</h2>
              <p className="text-secondary-500 mt-2">Handpicked selections for your next adventure</p>
            </div>
            {/* <Link to="/all-places" className="text-primary-500 font-medium hover:underline">View all</Link> */}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-secondary-200 aspect-[4/3] rounded-2xl mb-3"></div>
                  <div className="h-4 bg-secondary-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : places.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {places.map(place => (
                <ListingCard key={place._id} place={place} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-secondary-300">
              <p className="text-secondary-400 text-lg">No places found. Be the first to add one!</p>
            </div>
          )}
        </div>

        <MidSec />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
