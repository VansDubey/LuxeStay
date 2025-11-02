import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { AiOutlineUser, AiOutlinePhone, AiOutlineCalendar,AiOutlineDollarCircle } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { FaLessThanEqual } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Moon, User } from "lucide-react";
import { useContext } from 'react'
import { UserContext } from '../Usercontext'

const AllBooking = () => {
  const [Bookings, setBookings] = useState([])
  const [redirect, setredirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
   axios.get('http://localhost:3000/booking').then(response=>{
    setBookings(response.data);
   })
  }, [])

  if(redirect){
    return <Navigate to ={redirect}/>
  }
  
  return (
    <>
    {/* 🌐 Navbar */}
          <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200/30 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex justify-between items-center">
              
              {/* Logo Section */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏨</span>
                <Link to="/" className="group">
                  <h1 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    Elegancia
                  </h1>
                  <p className="text-sm text-gray-500 mt-1 italic">More than a stay, an experience.</p>
                </Link>
              </div>
    
              {/* Navigation Links */}
              <ul className="hidden md:flex space-x-10 text-gray-700 font-medium">
                <li>
                  <Link to="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
                </li>
                <li>
                  <Link to="/accounts/book" className="hover:text-blue-600 transition-colors duration-200">Places</Link>
                </li>
                <li>
                  <Link to="/accounts/booking" className="hover:text-blue-600 transition-colors duration-200">Bookings</Link>
                </li>
                <li>
                  <Link to="/accounts/places" className="hover:text-blue-600 transition-colors duration-200">Accommodations</Link>
                </li>
              </ul>
    
              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition">
                  <Moon size={20} />
                </button>
                <Link
                  to={user ? "/accounts/profile" : "/Login"}
                  className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <User size={20} />
                </Link>
              </div>
            </div>
          </nav>

    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">All Bookings</h1>
      {Bookings?.length > 0 && Bookings.map((item, index) => (
        <div key={index} className="flex items-center gap-4 p-4 bg-white shadow-lg rounded-lg" 
            onClick = {()=>setredirect(`/accounts/booking/${item._id}`)}>
          {/* Image Section */}
          <div className="flex-shrink-0">
            <img
              src={item.place.photos[0]}
              alt="Booking Place"
              className="h-[10vw] w-[10vw] rounded-lg object-cover"
            />
          </div>
          {/* Details Section */}
          <div className="space-y-2">
            <h1 className="text-lg font-semibold flex items-center gap-2">
              <AiOutlineUser /> {item.name}
            </h1>
            <p className="flex items-center gap-2 text-gray-600">
              <AiOutlinePhone /> {item.mobile}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <AiOutlineCalendar /> {item.checkin} - {item.checkout}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <FiUsers /> Number of guests: {item.guests}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <AiOutlineDollarCircle /> Price: ${item.price}
            </p>
          </div>
        </div>
      ))}
    </div>
    </>
   
  )
}

export default AllBooking