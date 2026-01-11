import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Calendar, Users, Briefcase, CreditCard, ChevronRight, User, Phone } from 'lucide-react';
import { UserContext } from '../../context/Usercontext';

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get('http://localhost:3000/booking').then(response => {
      setBookings(response.data);
    })
  }, [])

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-secondary-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-5xl mx-auto w-full px-6 md:px-10 py-12 mt-[80px]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-secondary-900">My Bookings</h1>
          {/* <div className="text-secondary-500 text-sm">{bookings.length} bookings found</div> */}
        </div>

        <div className="grid gap-6">
          {bookings?.length > 0 ? bookings.map((item, index) => (
            <div
              key={index}
              onClick={() => setRedirect(`/accounts/booking/${item._id}`)}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-secondary-100 hover:shadow-md transition cursor-pointer group flex flex-col md:flex-row gap-6"
            >
              {/* Image Section */}
              <div className="w-full md:w-48 h-48 md:h-32 bg-secondary-200 rounded-xl overflow-hidden flex-shrink-0 relative">
                {item.place?.photos?.[0] && (
                  <img
                    src={item.place.photos[0]}
                    alt="Booking Place"
                    className="h-full w-full object-cover group-hover:scale-110 transition"
                  />
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-secondary-800 shadow-sm">
                  ${item.price}
                </div>
              </div>

              {/* Details Section */}
              <div className="flex-grow flex flex-col justify-center">
                <h2 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {item.place?.name || "Booking Name Unavailable"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm text-secondary-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary-500" />
                    <span>{new Date(item.checkin).toLocaleDateString()} &rarr; {new Date(item.checkout).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-primary-500" />
                    <span>{item.guests} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-primary-500" />
                    <span className="font-medium text-secondary-900">Total: ${item.price}</span>
                  </div>
                </div>
              </div>

              {/* Arrow Icon (for affordance) */}
              <div className="hidden md:flex items-center justify-center text-secondary-300 group-hover:text-primary-500 transition-colors">
                <ChevronRight size={24} />
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-secondary-300">
              <Briefcase size={48} className="mx-auto text-secondary-300 mb-4" />
              <p className="text-secondary-500 text-lg">No bookings found.</p>
              <Link to="/" className="text-primary-600 hover:underline mt-2 inline-block">Explore places to stay</Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>

  )
}

export default AllBooking