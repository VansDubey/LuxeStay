import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { AiOutlineUser, AiOutlinePhone, AiOutlineCalendar,AiOutlineDollarCircle } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { FaLessThanEqual } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

const AllBooking = () => {
  const [Bookings, setBookings] = useState([])
  const [redirect, setredirect] = useState('');

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