import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useState } from 'react';
import { AiOutlinePhone, AiOutlineCalendar, AiOutlineDollarCircle } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const SingleBooking = () => {

    const {id} = useParams()
    const [booking, setbooking] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [rating, setRating] = useState(0);
    const [redirect, setredirect] = useState('');

    const handlePayment = () => {
      alert('Payment Successful!');
      setIsPaid(true);
      localStorage.setItem(`paymentStatus_${id}`, 'paid');
      setredirect('/accounts/booking');
    };

   useEffect(() => {
    if(id){
      axios.get('http://localhost:3000/booking').then(response=>{
       const foundBooking =  response.data.find((booking) => booking._id === id);
       console.log(foundBooking);
       setbooking(foundBooking);

       const paymentStatus = localStorage.getItem(`paymentStatus_${id}`);
      if (paymentStatus === 'paid') {
        setIsPaid(true);
      }

      })
    }
   }, [id])

   if(redirect){
    return <Navigate to ={redirect}/>
   }

  return (
    <div className=" m-2 p-4  overflow-hidden ">
      {/* Booking Initiation */}
      <div className="p-2 ">
        <h1 className="text-2xl font-bold mb-2">Booking Details</h1>
        <img src={booking?.place?.photos[0]} alt="Booking Place" className="w-full h-80 object-cover rounded-lg mb-4" />
      </div>

      {/* Place Info */}
      <div className="p-4 grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold">Place Information</h2>
          <p className="text-gray-700">{booking?.place?.name}</p>
          <p className="text-gray-700">{booking?.place?.address}</p>
          <p className="text-gray-700">{booking?.place?.description}</p>
        </div>

        {/* Personal Details */}
        <div>
          <h2 className="text-lg font-bold">Personal Details</h2>
          <p className="flex items-center gap-2 text-gray-600"><AiOutlinePhone /> {booking.mobile}</p>
          <p className="flex items-center gap-2 text-gray-600">
            <AiOutlineCalendar /> Check-in: {booking.checkin}
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <AiOutlineCalendar /> Check-out: {booking.checkout}
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <FiUsers /> Number of guests: {booking.guests}
          </p>
          <p className="text-lg flex items-center gap-2"><AiOutlineDollarCircle /> Price: ${booking.price}</p>
        </div>
      </div>

      {/* Payment Section */}
      {!isPaid ? (
        <div className="p-5 border-t">
          <p className="mb-4">To confirm the booking, pay the below amount:</p>
          <button
            onClick={handlePayment}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Pay ${booking.price}
          </button>
        </div>
      ) : (
        <>
          <div className="p-5 border-t text-green-600 font-semibold">Payment Done ✔</div>
          {/* Farewell Message */}
          <div className="p-5 text-center">
            <h3 className="text-lg font-semibold">Enjoy your Stay!</h3>
            <p className="text-gray-600">Thanks for booking</p>
          </div>

          {/* Rate Experience */}
          <div className="p-5 border-t text-center">
            <h3 className="text-lg font-semibold mb-2">Rate your Experience</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SingleBooking