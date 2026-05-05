import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/Usercontext';
import API_ENDPOINTS from '../../config/api';
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
    axios.get(API_ENDPOINTS.PLACES.LIST)
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
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Page Content */}
      <div className="flex-grow">
        <HeroSection />

        {/* Featured Places Section */}
        <div className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900">Featured Places</h2>
                <p className="text-secondary-500 text-base md:text-lg mt-3">Handpicked selections for your next adventure</p>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="animate-pulse">
                    <div className="bg-secondary-200 aspect-[4/3] rounded-2xl mb-4"></div>
                    <div className="h-4 bg-secondary-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : places.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {places.map(place => (
                  <ListingCard key={place._id} place={place} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-secondary-50 rounded-3xl border-2 border-dashed border-secondary-300 p-12 inline-block">
                  <p className="text-secondary-400 text-lg font-medium">No places found. Be the first to add one!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Testimonials Section - Alternating background */}
        <div className="py-16 md:py-24 bg-secondary-50">
          <MidSec />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Body;
