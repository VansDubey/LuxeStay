import React from 'react'
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { IoMdPhotos } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaWifi, FaConciergeBell, FaSwimmingPool, FaSpa, FaDumbbell, FaUtensils, FaDog, FaCar, FaGlassCheers, FaLaptopHouse } from 'react-icons/fa';


const PlacePage = () => {

  // const {user} = useState(UserContext);   // see ki kya use hai iska?

  const API_KEY="AIzaSyBZw37nLmvnCDLXT4HjDfueQ1KrlOL02Gg";
    const {id} = useParams();
    const [places, setplaces] = useState(null)
    const [showAllPhotos, setshowAllPhotos] = useState(false)
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [name, setname] = useState('');
    const [mobile, setmobile] = useState('');
    const [redirect, setredirect] = useState('');

    const perks = [
      { icon: <FaWifi size={40} />, title: 'Free Wi-Fi', description: 'Stay connected with high-speed internet access throughout the property.' },
      { icon: <FaConciergeBell size={40} />, title: '24/7 Room Service', description: 'Enjoy delicious meals and snacks delivered straight to your room at any hour.' },
      { icon: <FaSwimmingPool size={40} />, title: 'Swimming Pool', description: 'Relax and unwind in our pristine outdoor pool, perfect for a refreshing dip.' },
      { icon: <FaSpa size={40} />, title: 'Spa and Wellness Center', description: 'Rejuvenate with a range of spa treatments and wellness therapies tailored to relax your body and mind.' },
      { icon: <FaDumbbell size={40} />, title: 'Fitness Center', description: 'Maintain your workout routine with our fully equipped gym, open 24/7.' },
      { icon: <FaUtensils size={40} />, title: 'Complimentary Breakfast', description: 'Start your day right with a diverse selection of breakfast options.' },
      { icon: <FaDog size={40} />, title: 'Pet-Friendly', description: 'Bring your furry friends along for a comfortable and welcoming stay.' },
      { icon: <FaCar size={40} />, title: 'Free Parking', description: 'Enjoy the convenience of free on-site parking during your stay.' },
      { icon: <FaGlassCheers size={40} />, title: 'Welcome Drink', description: 'Get a refreshing welcome drink upon arrival to start your stay right.' },
      { icon: <FaLaptopHouse size={40} />, title: 'Business Center', description: 'Access work facilities like computers, printers, and meeting rooms.' }
    ];

    useEffect(() => {
     if(!id){
        return;
     }
     else{
        axios.get(`http://localhost:3000/places/${id}`).then(response=>{
            setplaces(response.data);
        })
     }
    }, [id])//everytime id changes we need to implement this
    
    if(!places){
        return '';
    }


 
  const pricePerNight = places.price;
  const serviceFee = 635;
  

  const calculateTotal = () => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24) || 0;
    return pricePerNight * nights + serviceFee;
  };

  const handleReserve = async () => {
    try {
      const data = {
        place:places._id,
       checkin: checkIn,
        checkout:checkOut,
        price: calculateTotal(),
        guests,
        name,
        mobile
      };
  
      const response = await axios.post('http://localhost:3000/booking', data);
      const bookingId = response.data._id;
      alert(`Booking confirmed! Total: ₹${calculateTotal()}`);
      setredirect(`/accounts/booking/${bookingId}`)

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to make a booking. Please try again.');
    }
  };

  if(redirect){
    return <Navigate to ={redirect}/>
  }
 
    if(showAllPhotos){
        return(
            <div >
                 <button className="flex items-center justify-center ] bg-white rounded-xl p-2" 
                        onClick={()=>setshowAllPhotos(false)}>
                          <div><IoCloseSharp /></div>
                           <p>Close Photos</p> 
                       </button>
                <div className="grid grid-cols-3 gap-4 ">
                {places.photos.length>0 && places.photos.map(item=>{
                    return(
                        <img src ={item} className="aspect-square object-cover rounded-lg"/>
                    )
                })}
                    
                </div>
               
               
            </div>
        )
    }
  return (
        <>
          <div className="m-5 p-3" >
            <div >
              {/* Place Name */}
              <p>
              <h2 className="text-3xl font-bold mb-2 text-gray-800">{places.name}  </h2>

                      <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(places.address)}`} 
                  target="_blank" 
                     rel="noopener noreferrer"
                       className="text-blue-500 hover:underline"
                        >
                         {places.address}
                          </a>

              </p>
    
      {/* Description */}
      <p className="text-gray-600 mt-2" ><strong>{places.description}</strong> </p>

            </div>
  
    

  {/* Rating and Price */}
  <div className="flex items-center justify-between mb-4 mt-2">
    <div className="flex items-center">
      <span className="text-yellow-400 text-lg">⭐</span>
      <span className="text-gray-700 ml-1">{places.rating || "4.5"}</span>
    </div>
    <p className="text-lg font-semibold text-green-600">${places.price || "150"} / night</p>
  </div>

  {/* Photos */}
  <div className="relative">
  {places.photos?.length > 0 && (
    <div className="grid gap-2 grid-cols-[2fr_1fr]">
      {/* Large Image */}
      <div>
        <img src={places.photos[0]} className="w-full h-[30vw] object-cover rounded-lg shadow-md" />
      </div>
      {/* Small Images */}
      <div className="flex flex-col gap-2">
        <img src={places.photos[1]} className="w-full h-[15vw] object-cover rounded-lg shadow-md" />
        <img src={places.photos[2]} className="w-full h-[15vw] object-cover rounded-lg shadow-md" />
      </div>
    </div>
  )}

  </div>
  
  <button className="flex items-center justify-center absolute bottom-[8vw] right-[4vw] bg-white rounded-xl p-2" 
  onClick={()=>setshowAllPhotos(true)}>
    <div><IoMdPhotos /></div>
   <p>Show More Photos</p> 
    </button>

 <div className="flex justify-evenly m-3 p-3 gap-8">
   {/* Random Details */}
   <div>
   <div>
      <p className="text-gray-600 mt-4 text-2xl font-bold">Perks</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {perks.map((perk, index) => (
          <div key={index} className="flex items-center p-2 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
            <div className="text-blue-500 mr-4">{perk.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{perk.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{perk.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

   </div>

{/* {Booking} */}
<div className="w-1/2">
<div className="max-w-sm mx-auto border p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">₹{places.price} <span className="text-sm">night</span></h1>

      <div className="my-4">
        <label className="block text-sm font-medium">Check-In</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm font-medium">Check-Out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm font-medium">Guests</label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm font-medium">Full name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname((e.target.value) || 1)}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="my-4">
        <label className="block text-sm font-medium">Mobile Number</label>
        <input
          type="number"
          value={mobile}
          onChange={(e) => setmobile((e.target.value) )}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600"
        onClick={handleReserve}
      >
        Reserve
      </button>

      <p className="text-center text-sm mt-2">You won't be charged yet</p>

      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between">
          <span>₹{pricePerNight} x {(new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24) || 0} nights</span>
          <span>₹{pricePerNight * ((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24) || 0)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service fee</span>
          <span>₹{serviceFee}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total before taxes</span>
          <span>₹{calculateTotal()}</span>
        </div>
      </div>
    </div>

</div>

 </div>
 
 
<p className="text-gray-600 mt-4 text-2xl"><strong>Exact Location:</strong></p>
<div style={{ width: '100%', height: '400px' }}>
  <iframe
    width="100%"
    height="100%"
    style={{ border: 0 }}  // Fix here
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${places.name}`}
  ></iframe>
</div>

 
</div>

<footer className="bg-gray-100 p-5 gap-3 ">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-700">
    {/* Support Section */}
    <div>
      <h3 className="font-semibold mb-2 gap-4">Support</h3>
      <ul>
        <li>Contact Us</li>
        <li>FAQs</li>
        <li>Privacy Policy</li>
        <li>Terms of Service</li>
        <li>Report an Issue</li>
      </ul>
    </div>

    {/* Company Section */}
    <div>
      <h3 className="font-semibold mb-2">Company</h3>
      <ul>
        <li>About Us</li>
        <li>Careers</li>
        <li>Blog</li>
        <li>Press</li>
        <li>Partnerships</li>
      </ul>
    </div>

    {/* Community Section */}
    <div>
      <h3 className="font-semibold mb-2">Community</h3>
      <ul>
        <li>Events</li>
        <li>Forums</li>
        <li>Volunteer</li>
        <li>Ambassador Program</li>
        <li>Support Groups</li>
      </ul>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center mt-8 border-t pt-4 text-sm text-gray-600">
    <div>&copy; 2025 YourApp, Inc. · Privacy · Terms · Sitemap · Company details</div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1 cursor-pointer">
        
        <span>English (IN)</span>
      </div>
      <div className="flex items-center space-x-1 cursor-pointer">
        
        <span>INR</span>
      </div>
      <div className="flex space-x-3">
        <FaFacebook className="w-5 h-5 cursor-pointer" />
        <FaTwitter className="w-5 h-5 cursor-pointer" />
        <FaInstagram className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  </div>
</footer>


          </>

  
 
  
  )
}

export default PlacePage