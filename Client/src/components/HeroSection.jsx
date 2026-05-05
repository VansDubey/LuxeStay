import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

const HeroSection = () => {
    return (
        <div className="relative w-full min-h-screen lg:h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Luxury Hotel"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 md:px-6 max-w-5xl mx-auto space-y-8 py-20 lg:py-0">
                <div className="space-y-4 md:space-y-6 animate-fade-in">
                    <div className="inline-block">
                        <span className="text-primary-300 text-sm md:text-base font-semibold uppercase tracking-widest bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                            🂪 Your Dream Destination Awaits
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight">
                        Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500">Escape</span>
                    </h1>
                    <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
                        Discover extraordinary homes, luxury villas, and unique stays curated just for you across the world.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="bg-white/95 backdrop-blur-lg p-3 md:p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-2 animate-slide-up border border-white/20">
                    <div className="flex-1 w-full md:w-auto px-4 md:px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 text-left hover:bg-gray-50/50 rounded-lg transition-all duration-200 cursor-pointer group">
                        <label className="block text-xs font-bold text-secondary-800 uppercase tracking-wider group-hover:text-primary-600 transition-colors">Location</label>
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            className="w-full bg-transparent border-none p-0 text-secondary-900 placeholder-secondary-400 focus:ring-0 text-sm md:text-base font-medium"
                        />
                    </div>

                    <div className="flex-1 w-full md:w-auto px-4 md:px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 text-left hover:bg-gray-50/50 rounded-lg transition-all duration-200 cursor-pointer group">
                        <label className="block text-xs font-bold text-secondary-800 uppercase tracking-wider group-hover:text-primary-600 transition-colors">Check in</label>
                        <input
                            type="text"
                            placeholder="Add dates"
                            className="w-full bg-transparent border-none p-0 text-secondary-900 placeholder-secondary-400 focus:ring-0 text-sm md:text-base font-medium"
                        />
                    </div>

                    <div className="flex-1 w-full md:w-auto px-4 md:px-6 py-3 text-left hover:bg-gray-50/50 rounded-lg transition-all duration-200 cursor-pointer group">
                        <label className="block text-xs font-bold text-secondary-800 uppercase tracking-wider group-hover:text-primary-600 transition-colors">Guests</label>
                        <input
                            type="text"
                            placeholder="Add guests"
                            className="w-full bg-transparent border-none p-0 text-secondary-900 placeholder-secondary-400 focus:ring-0 text-sm md:text-base font-medium"
                        />
                    </div>

                    <button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white p-3 md:p-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-primary-500/40 w-full md:w-auto flex justify-center items-center gap-2 font-medium group">
                        <Search size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">Search</span>
                    </button>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 pt-4 md:pt-8">
                    <button className="group px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary-500/40 flex items-center gap-2 w-full sm:w-auto justify-center">
                        Explore Stays
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="group px-8 py-3 border-2 border-white text-white hover:bg-white/10 font-semibold rounded-xl transition-all backdrop-blur-sm flex items-center gap-2 w-full sm:w-auto justify-center">
                        Become a Host
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
