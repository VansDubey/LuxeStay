import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, MapPin, Zap } from 'lucide-react';
import Image from './Image';

const ListingCard = ({ place }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    
    // Render star rating with dynamic fill
    const renderStars = (rating = 4.8) => {
        const stars = [];
        const ratingNum = parseFloat(rating);
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={14}
                    className={i <= Math.floor(ratingNum) ? 'fill-primary-400 text-primary-400' : 'text-secondary-300'}
                />
            );
        }
        return stars;
    };

    // Calculate nights booked for trending badge
    const isTrending = Math.random() > 0.7; // Mock trending logic
    const isNewListing = place.createdAt && new Date(place.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        setIsFavorite(!isFavorite);
        // TODO: Persist to localStorage or backend
    };

    return (
        <Link to={`/places/${place._id}`} className="group block relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary-200 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                {place.photos?.[0] && (
                    <Image
                        src={place.photos[0]}
                        alt={place.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    {isTrending && (
                        <div className="flex items-center gap-1 bg-primary-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                            <Zap size={12} className="fill-current" />
                            Trending
                        </div>
                    )}
                    {isNewListing && (
                        <div className="bg-secondary-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                            New
                        </div>
                    )}
                    {place.availability && (
                        <div className="bg-green-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Available
                        </div>
                    )}
                </div>

                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                        isFavorite
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                            : 'bg-white/70 hover:bg-white text-secondary-700'
                    }`}
                >
                    <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                </button>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Card Content */}
            <div className="mt-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 text-secondary-600 text-sm mb-1">
                            <MapPin size={14} className="flex-shrink-0" />
                            <p className="truncate text-secondary-600 text-sm">{place.address}</p>
                        </div>
                        <h3 className="font-semibold text-secondary-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {place.title}
                        </h3>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                        {renderStars(place.rating)}
                    </div>
                    <span className="text-secondary-700 font-medium text-sm">
                        {place.rating ? place.rating.toFixed(1) : '4.8'}
                    </span>
                    <span className="text-secondary-500 text-xs">({place.reviews?.length || 0})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-bold text-lg text-secondary-900">${place.price}</span>
                    <span className="text-secondary-500 text-sm">per night</span>
                </div>
            </div>
        </Link>
    );
};

export default ListingCard;
