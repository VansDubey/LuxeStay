import React from "react";
import { Star } from "lucide-react";

//Reviews
const reviews = [
  {
    id: 1,
    name: "Emily Johnson",
    review: "Amazing experience! The house was clean, spacious, and well-maintained. Highly recommended!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Michael Smith",
    review: "Great location and fantastic host. Will definitely book again.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 3,
    name: "Sarah Brown",
    review: "A cozy and comfortable place to stay. Loved the amenities!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 4,
    name: "David Lee",
    review: "The apartment was perfect for our needs. Excellent location and great host!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 5,
    name: "Emily Clark",
    review: "Wonderful stay! Clean, quiet, and the host was very welcoming.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  }
];

const MidSec = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-3">What Our Guests Say</h2>
        <p className="text-secondary-500 text-base md:text-lg max-w-2xl mx-auto">Real reviews from our happy guests who've experienced luxury stays</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg border border-secondary-100 transition-shadow duration-300">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-secondary-300"}
                />
              ))}
            </div>
            
            {/* Review Text */}
            <p className="text-secondary-700 text-sm md:text-base mb-6 leading-relaxed italic">"{review.review}"</p>
            
            {/* Author */}
            <div className="flex items-center gap-3 pt-6 border-t border-secondary-100">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-secondary-900 text-sm">{review.name}</h3>
                <p className="text-xs text-secondary-500">Verified Guest</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MidSec;
