import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';
import { Calendar, Users, MapPin, CreditCard, ChevronLeft, CheckCircle, Star } from 'lucide-react';

const SingleBooking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [rating, setRating] = useState(0);
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    if (id) {
      axios.get('http://localhost:3000/booking').then(response => {
        const foundBooking = response.data.find((b) => b._id === id);
        setBooking(foundBooking);

        const paymentStatus = localStorage.getItem(`paymentStatus_${id}`);
        if (paymentStatus === 'paid') {
          setIsPaid(true);
        }
      });
    }
  }, [id]);

  const handlePayment = () => {
    // Simulating payment processing
    const confirmPayment = window.confirm(`Confirm payment of $${booking.price}?`);
    if (confirmPayment) {
      setIsPaid(true);
      localStorage.setItem(`paymentStatus_${id}`, 'paid');
      alert('Payment Successful!');
    }
  };

  if (redirect) return <Navigate to={redirect} />;
  if (!booking) return <div className="min-h-screen flex items-center justify-center"><p>Loading booking details...</p></div>;

  return (
    <div className="bg-secondary-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-4xl mx-auto w-full px-6 py-12 mt-[80px]">
        <Button onClick={() => setRedirect('/accounts/booking')} variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary-600">
          <ChevronLeft size={20} className="mr-2" /> Back to all bookings
        </Button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-secondary-100">
          {/* Header Image */}
          <div className="h-64 md:h-80 w-full bg-secondary-200 relative">
            {booking.place?.photos?.[0] && (
              <img src={booking.place.photos[0]} alt="Place" className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 shadow-sm">{booking.place?.name}</h1>
                <p className="text-white/90 flex items-center gap-2 shadow-sm">
                  <MapPin size={18} /> {booking.place?.address}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Booking Details */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-secondary-900 mb-4">Reservation Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-secondary-50 rounded-xl border border-secondary-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-3 rounded-lg text-primary-600 shadow-sm"><Calendar size={20} /></div>
                    <div>
                      <p className="text-xs text-secondary-500 font-bold uppercase tracking-wider">Check-in</p>
                      <p className="font-medium text-secondary-900">{booking.checkin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-3 rounded-lg text-primary-600 shadow-sm"><Calendar size={20} /></div>
                    <div>
                      <p className="text-xs text-secondary-500 font-bold uppercase tracking-wider">Check-out</p>
                      <p className="font-medium text-secondary-900">{booking.checkout}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-3 rounded-lg text-primary-600 shadow-sm"><Users size={20} /></div>
                    <div>
                      <p className="text-xs text-secondary-500 font-bold uppercase tracking-wider">Guests</p>
                      <p className="font-medium text-secondary-900">{booking.guests} guests</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-3 rounded-lg text-primary-600 shadow-sm"><CreditCard size={20} /></div>
                    <div>
                      <p className="text-xs text-secondary-500 font-bold uppercase tracking-wider">Total Price</p>
                      <p className="font-medium text-secondary-900">${booking.price}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-secondary-900 mb-2">Description</h2>
                <p className="text-secondary-600 leading-relaxed">{booking.place?.description}</p>
              </section>
            </div>

            {/* Payment & Status Sidebar */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border-2 border-dashed border-secondary-200 text-center">
                <h3 className="font-bold text-secondary-900 mb-4">Payment Status</h3>
                {isPaid ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle size={48} className="text-green-500 mb-2" />
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">Paid Successfully</span>
                    <p className="text-gray-500 text-sm mt-2">Thank you for your booking!</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-secondary-600 text-sm">Please finalize your payment to confirm this reservation.</p>
                    <Button onClick={handlePayment} className="w-full">
                      Pay ${booking.price}
                    </Button>
                  </div>
                )}
              </div>

              {isPaid && (
                <div className="text-center space-y-4">
                  <h3 className="font-bold text-secondary-900">Rate your Experience</h3>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`transition hover:scale-110 focus:outline-none ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      >
                        <Star size={28} fill={rating >= star ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && <p className="text-sm text-secondary-500">Thanks for rating!</p>}
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

export default SingleBooking;