import React from 'react';
import { Search } from 'lucide-react';
import Button from './ui/Button';

const HeroSection = () => {
    return (
        <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Luxury Hotel"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto space-y-8 animate-fade-in">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
                        Find Your Perfect <span className="text-primary-400">Escape</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        Discover extraordinary homes, luxury villas, and unique stays around the world.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-2 animate-slide-up">
                    <div className="flex-1 w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100 text-left hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                        <label className="block text-xs font-bold text-secondary-800 uppercase tracking-wider group-hover:text-primary-600">Location</label>
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            className="w-full bg-transparent border-none p-0 text-secondary-900 placeholder-secondary-400 focus:ring-0 text-sm font-medium"
                        />
                    </div>

                    <div className="flex-1 w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100 text-left hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                        <label className="block text-xs font-bold text-secondary-800 uppercase tracking-wider group-hover:text-primary-600">Check in</label>
                        <input
                            type="text"
                            placeholder="Add dates"
                            className="w-full bg-transparent border-none p-0 text-secondary-900 placeholder-secondary-400 focus:ring-0 text-sm font-medium"
                        />
                    </div>

                    <div className="flex-1 w-full md:w-auto px-4 py-2 text-left hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                        <label className="block text-xs font-bold text-secondary-800 uppercase tracking-wider group-hover:text-primary-600">Guests</label>
                        <input
                            type="text"
                            placeholder="Add guests"
                            className="w-full bg-transparent border-none p-0 text-secondary-900 placeholder-secondary-400 focus:ring-0 text-sm font-medium"
                        />
                    </div>

                    <button className="bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-xl transition-all shadow-lg hover:shadow-primary-500/30 w-full md:w-auto flex justify-center items-center">
                        <Search size={24} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
