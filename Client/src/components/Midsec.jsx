import React from "react";
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
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Guests Say</h2>
        <p className="text-gray-600 mb-10">Real reviews from our happy guests</p>

        <div className="flex flex-wrap justify-center gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="max-w-sm p-4 shadow-lg bg-white rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.review}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MidSec;
