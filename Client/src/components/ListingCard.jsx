import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import Image from './Image'; // Assuming you have an Image component wrapper

const ListingCard = ({ place }) => {
    return (
        <Link to={`/places/${place._id}`} className="group block relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary-200">
                {place.photos?.[0] && (
                    <Image
                        src={place.photos[0]}
                        alt={place.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                )}

                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/50 backdrop-blur-md hover:bg-white text-secondary-700 hover:text-primary-500 transition-colors">
                    <Heart size={20} />
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="mt-3 space-y-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-secondary-900 truncate pr-4">{place.address}</h3>
                    <div className="flex items-center gap-1 text-secondary-800 text-sm">
                        <Star size={14} className="fill-current" />
                        <span>4.8</span>
                    </div>
                </div>

                <p className="text-secondary-500 text-sm truncate">{place.title}</p>

                <div className="flex items-baseline gap-1 pt-1">
                    <span className="font-bold text-secondary-900">${place.price}</span>
                    <span className="text-secondary-500 text-sm">night</span>
                </div>
            </div>
        </Link>
    );
};

export default ListingCard;
