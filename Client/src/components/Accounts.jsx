import React from 'react'
import { Navigate} from 'react-router-dom'
import { UserContext } from '../Usercontext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Accounts = () => {
  const [redirect, setredirect] = useState(null);
  const { ready, user } = useContext(UserContext);
  const [booking, setbooking] = useState([]);
  const [places, setplaces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/profilebooking').then(response => {
      setbooking(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/places').then(response => {
      setplaces(response.data);
    });
  }, []);

  if (ready && !user) {
    return <Navigate to='/login' />
  }

  async function logout() {
    await axios.post('http://localhost:3000/logout');
    setredirect('/');
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className ="m-5 p-5">

<div className="flex flex-col md:flex-row gap-6 mb-6">
  {/* Header Section (Left Side) */}
  <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 w-full md:w-1/2">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">My Dashboard</h1>
    <div className="space-y-2">
      <p className="font-medium text-gray-800">{user.name}</p>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-600">+1 - 856-589</p>
      <button 
        onClick={logout} 
        className="w-full bg-gray-400 py-2 rounded-lg mt-4 hover:text-gray-600 transition-all"
      >
        Logout
      </button>
    </div>
  </div>

  {/* My Bookings Card (Right Side) */}
  <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 w-full md:w-1/2">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">My Bookings</h2>
  {booking.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {booking.map(item => (
        <div key={item._id} className="border p-3 rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-md font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.place.name}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600">No bookings found</p>
  )}
</div>

</div>

{/* My Places Card */}
<div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 w-full">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-gray-800">My Places</h2>
  </div>

  {places.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {places.map(item => (
        <div key={item._id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-md font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.address}</p>
          <p className="text-sm text-gray-600">Price: ${item.price}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600">No places found</p>
  )}
</div>


        </div>
      
    
  );
};

export default Accounts;
