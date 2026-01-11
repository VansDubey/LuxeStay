import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';
import {
  Wifi, Coffee, Droplets /* Pool */, Dumbbell,
  Dog, Car, MapPin, Star, Share, Heart, Grid, X, ChevronLeft
} from 'lucide-react';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Booking State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:3000/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const pricePerNight = place.price || 150;
  const serviceFee = 50;

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    if (nights < 0) return 0;
    return (pricePerNight * nights) + serviceFee;
  };

  const handleReserve = async () => {
    if (!checkIn || !checkOut) return alert("Please select dates");
    try {
      const data = {
        place: place._id,
        checkin: checkIn,
        checkout: checkOut,
        price: calculateTotal(),
        guests,
        name,
        mobile
      };
      const response = await axios.post('http://localhost:3000/booking', data);
      alert(`Booking confirmed! Total: $${calculateTotal()}`);
      setRedirect(`/accounts/booking/${response.data._id}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to make a booking. Please try again.');
    }
  };

  if (redirect) return <Navigate to={redirect} />;

  // Full Screen Photos View
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white z-[60] min-h-screen">
        <div className="p-8 grid gap-4 bg-white">
          <div className="fixed top-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-b flex justify-between items-center z-50">
            <Button onClick={() => setShowAllPhotos(false)} variant="ghost" className="gap-2">
              <ChevronLeft size={20} /> Back to listing
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full"><Share size={18} /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Heart size={18} /></Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16 max-w-7xl mx-auto">
            {place.photos?.map((photo, i) => (
              <img key={i} src={photo} alt="" className="w-full object-cover aspect-square rounded-xl hover:opacity-90 transition" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-10">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 mt-[80px]">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-2">{place.name}</h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-secondary-600 font-medium underline">
              <Star className="fill-current text-primary-500" size={16} />
              <span>{place.rating || "4.8"} · 12 reviews</span>
              <span className="mx-1">·</span>
              <MapPin size={16} />
              <span>{place.address}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition"><Share size={16} /> Share</button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition"><Heart size={16} /> Save</button>
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="relative rounded-2xl overflow-hidden mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[50vh] min-h-[400px]">
            <div className="md:col-span-2 h-full">
              {place.photos?.[0] && (
                <img src={place.photos[0]} onClick={() => setShowAllPhotos(true)} className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition" alt="Main" />
              )}
            </div>
            <div className="hidden md:grid grid-cols-1 gap-2 h-full">
              {place.photos?.[1] && <img src={place.photos[1]} onClick={() => setShowAllPhotos(true)} className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition" alt="Sub 1" />}
              {place.photos?.[2] && <img src={place.photos[2]} onClick={() => setShowAllPhotos(true)} className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition" alt="Sub 2" />}
            </div>
            <div className="hidden md:grid grid-cols-1 gap-2 h-full">
              {place.photos?.[3] && <img src={place.photos[3]} onClick={() => setShowAllPhotos(true)} className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition" alt="Sub 3" />}
              {place.photos?.[4] && <img src={place.photos[4]} onClick={() => setShowAllPhotos(true)} className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition" alt="Sub 4" />}
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:scale-105 transition flex items-center gap-2"
          >
            <Grid size={16} /> Show all photos
          </button>
        </div>

        {/* Main Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">

            {/* Host Info */}
            <div className="flex items-center justify-between border-b pb-6">
              <div>
                <h2 className="text-xl font-bold text-secondary-900">Entire home hosted by Owner</h2>
                <p className="text-secondary-500">4 guests · 2 bedrooms · 2 beds · 2 baths</p>
              </div>
              <div className="h-12 w-12 bg-secondary-200 rounded-full overflow-hidden">
                {/* Host Avatar Placeholder */}
              </div>
            </div>

            {/* Description */}
            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-4">About this place</h3>
              <p className="text-secondary-600 leading-relaxed font-light">{place.description}</p>
            </div>

            {/* Amenities (Partial List for visual) */}
            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-secondary-700 font-light"><Wifi size={20} /> Free Wifi</div>
                <div className="flex items-center gap-3 text-secondary-700 font-light"><Coffee size={20} /> Coffee Maker</div>
                <div className="flex items-center gap-3 text-secondary-700 font-light"><Car size={20} /> Free Parking</div>
                <div className="flex items-center gap-3 text-secondary-700 font-light"><Dog size={20} /> Pet Friendly</div>
              </div>
              <Button variant="outline" className="mt-6">Show all amenities</Button>
            </div>

            {/* Map (Placeholder) */}
            <div className="pb-6">
              <h3 className="text-xl font-bold mb-4">Where you'll be</h3>
              <p className="mb-4 text-secondary-600">{place.address}</p>
              <iframe
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '1rem' }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBZw37nLmvnCDLXT4HjDfueQ1KrlOL02Gg&q=${encodeURIComponent(place.address)}`}
              ></iframe>
            </div>

          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="relative">
            <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-xl border border-secondary-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-2xl font-bold text-secondary-900">${pricePerNight}</span>
                  <span className="text-secondary-500"> / night</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Star size={14} className="fill-current text-primary-500 mr-1" /> 4.8
                </div>
              </div>

              <div className="border border-secondary-300 rounded-xl overflow-hidden mb-4">
                <div className="flex border-b border-secondary-300">
                  <div className="w-1/2 p-3 border-r border-secondary-300">
                    <label className="block text-xs font-bold uppercase text-secondary-800">Check-in</label>
                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-sm outline-none text-secondary-600 bg-transparent" />
                  </div>
                  <div className="w-1/2 p-3">
                    <label className="block text-xs font-bold uppercase text-secondary-800">Check-out</label>
                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-sm outline-none text-secondary-600 bg-transparent" />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs font-bold uppercase text-secondary-800">Guests</label>
                  <input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full text-sm outline-none text-secondary-600 bg-transparent" />
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                <input type="text" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
              </div>

              <Button onClick={handleReserve} className="w-full py-3 text-lg mb-4">Reserve</Button>

              <p className="text-center text-secondary-500 text-sm mb-6">You won't be charged yet</p>

              {checkIn && checkOut && (
                <div className="space-y-2 text-secondary-600 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="underline">${pricePerNight} x {Math.max(0, (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} nights</span>
                    <span>${pricePerNight * Math.max(0, (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>${serviceFee}</span>
                  </div>
                  <div className="flex justify-between font-bold text-secondary-900 pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlacePage;