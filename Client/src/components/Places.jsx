import React from 'react'
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import Perks from './Perks';
import { MdDownloading } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useContext } from 'react'
import { UserContext } from '../Usercontext'
import { Moon, User } from "lucide-react";

const Places = () => {
  const {user} = useContext(UserContext)
  const {ready} = useParams();
  const [title, settitle] = useState('')
  const [address, setaddress] = useState('')
  const [description, setdescription] = useState('')
  const [checkIn, setcheckIn] = useState('')
  const [checkOut, setcheckOut] = useState('')
  const [Redirect, setRedirect] = useState('')
  const [selectedImages, setselectedImages] = useState([])
  const [places, setplaces] = useState([])
  const [selected, setselected] = useState([])
  const [price, setprice] = useState(100)
  const [perks, setperks] = useState([])
  const [ link, setlink] = useState('')
  const [AddedPhotos, setAddedPhotos] = useState([])
  const [image, setimage] = useState([])
   
  const {id} = useParams();
  console.log(id);

  useEffect(() => {
  if(!id){
    return;
  }

  axios.get(`http://localhost:3000/places/${id}`).then((response)=>{
    const {data} = response;
    console.log(data);
     settitle(data.name);
     setdescription(data.description)
     setaddress(data.address)
     setcheckIn(data.checkIn)
     setcheckOut(data.checkOut)
     setperks(data.perks)
     setprice(data.price)
     setAddedPhotos(data.photos)
  })

  }, [id])
  
  useEffect(() => {
    axios.get('http://localhost:3000/user-places').then(({data})=>{
      setplaces(data);
    })

  }, [])
  
    async function SavePlace(ev){
      ev.preventDefault();
      const placeData = {
        title,address,description,
        checkIn,checkOut,perks,price,AddedPhotos
      };
      
      if(id){
        //update
         await axios.put('http://localhost:3000/places',{
         id,...placeData
        
        }
        );
        setRedirect('/accounts/places');
      }
      else{
        //add new place
         await axios.post('http://localhost:3000/places',placeData);
        setRedirect('/accounts/places');
      }
     
    }

    if(Redirect){
      return <Navigate to ={Redirect}/>
    }

    //Upload Photos section

    function addPhotoByLink(ev){
      ev.preventDefault();
      const promise = axios.post('http://localhost:3000/upload-by-link',{link:link})
      promise.then(res=>{
          const data = res.data;
          console.log({data});
        }
      )
    
      setAddedPhotos(prev=>{
        return [...prev,link]
      })
     setlink('')
     }
  
     async function uploadPhoto(ev){
      ev.preventDefault();
      const file = ev.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      console.log(...formData);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        
      });
      const url = response.data.imageurl;
   
      setAddedPhotos(prev=>{
        return [...prev,url]
      })
     
    } catch (error) {
      console.error(error);
      // Handle upload errors
    }
  }
  
  //Deleting the images
  function removeImageLink(link){
    setAddedPhotos(AddedPhotos.filter(prev=>prev!=link));
  }

  //Marking as main photo
  function mainPhoto(link){
    const withoutMainPhoto = setAddedPhotos(AddedPhotos.filter(prev=>prev!=link));
    const withMainPhoto = [link,...withoutMainPhoto];
    setAddedPhotos(withMainPhoto);

  }

  return (
    <div>
<div>
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

  {ready !== 'new' && (
    <div className="py-6 px-8">
      <p className="text-3xl font-semibold text-gray-700 mb-6">List of all places:</p>

      {places.length > 0 && places.map((item) => (
        <Link to={`/accounts/places/new/${item._id}`} key={item._id}>
          <div className="bg-slate-100 p-4 rounded-lg shadow-md mb-6 hover:bg-slate-200 transition-all">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <h2 className="text-sm text-gray-600">{item.address}</h2>
            </div>
            <p className="text-gray-700">{item.description}</p>

            {item.photos.length > 0 && (
              <div className="h-[12vw] w-full mt-4 flex gap-2 overflow-x-auto">
                {item.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Photo of ${item.name}`}
                    className="rounded-lg w-[20vw] object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </Link>
      ))}

      <br />
      <Link
        to="/accounts/places/new"
        className="bg-slate-600 text-white p-3 rounded-xl block mx-auto text-center  transition-all"
      >
        Add New Place
      </Link>
    </div>
  )}
</div>

{
  ready === 'new' && (
    <>
      <form onSubmit={SavePlace} className="w-full  mx-auto p-6 bg-white shadow-lg rounded-xl">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-gray-800">Add a New Place</h1>

          {/* Title */}
          <div className="flex  items-center gap-2">
            <label className="text-2xl font-medium text-gray-700">Title</label>
            <input
              className="border-2 p-2 rounded-md w-full md:w-1/2 mt-2 focus:outline-none focus:ring-2 focus:bg-slate-600"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={ev => settitle(ev.target.value)}
            />
          </div>

          {/* Address */}
          <div className="flex  items-center gap-2">
            <label className="text-2xl font-medium text-gray-700">Address</label>
            <input
              className="border-2 p-2 rounded-md w-full md:w-1/2 mt-2 focus:outline-none focus:ring-2 focus:bg-slate-600"
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={ev => setaddress(ev.target.value)}
            />
          </div>

          {/* Upload Photos */}
          <div >
            <label className="text-2xl font-medium text-gray-700">Photos</label>
            <div className="flex gap-4 mt-2">
              <input
                className="border-2 p-2 rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:bg-slate-600"
                type="text"
                placeholder="Add photo via link..."
                value={link}
                onChange={ev => setlink(ev.target.value)}
              />
              <button
                type="button"
                onClick={addPhotoByLink}
                className="bg-slate-600 text-white p-2 rounded-2xl w-1/4 hover:bg-slate-600 transition-all"
              >
                Add Photo
              </button>
            </div>

            {/* Added Photos Preview */}
            <div className="flex gap-4 flex-wrap mt-4">
              {AddedPhotos.map(link => (
                <div key={link} className="relative group">
                  <img
                    src={link}
                    alt="Added photo"
                    style={{
                      borderRadius: '10px',
                      width: '12vw',
                      height: '7vw',
                      objectFit: 'cover',
                    }}
                    className="transition-transform group-hover:scale-105"
                  />
                  <div
                    onClick={() => removeImageLink(link)}
                    className="absolute top-0 right-0 m-2 bg-white rounded-full cursor-pointer p-1  hover:bg-gray-200"
                  >
                    <FaRegTrashAlt />
                  </div>
                  {link === AddedPhotos[0] ? (
                    <div
                      onClick={() => mainPhoto(link)}
                      className="absolute top-0 right-0 m-2 bg-white rounded-full cursor-pointer p-1 text-yellow-500"
                    >
                      <FaRegStar />
                    </div>
                  ) : (
                    <div
                      onClick={() => mainPhoto(link)}
                      className="absolute top-0 right-0 m-2 bg-white rounded-full cursor-pointer p-1 text-yellow-500"
                    >
                      <FaStar />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* File Upload */}
            <label className="h-[7vw] w-[10vw] border-2 border-black rounded-md flex items-center justify-center cursor-pointer mt-4">
              <input type="file" className="hidden" onChange={uploadPhoto} />
              <MdDownloading size="2vw" className="text-gray-600" />
            </label>
          </div>

          {/* Description */}
          <div className="flex  items-center gap-2">
            <label className="text-2xl font-medium text-gray-700">Description</label>
            <textarea
              className="border-2 p-2 rounded-md w-full md:w-1/2 mt-2 focus:outline-none focus:ring-2 focus:bg-slate-600"
              placeholder="Enter description here"
              value={description}
              onChange={ev => setdescription(ev.target.value)}
            />
          </div>

          {/* Checkin Time */}
          <div className="flex  items-center gap-2">
            <label className="text-2xl font-medium text-gray-700">Check-in Time</label>
            <input
              className="border-2 p-2 rounded-md w-full md:w-1/2 mt-2 focus:outline-none focus:ring-2 focus:bg-slate-600"
              type="text"
              placeholder="Check-in time"
              value={checkIn}
              onChange={ev => setcheckIn(ev.target.value)}
            />
          </div>

          {/* Checkout Time */}
          <div className="flex  items-center gap-2">
            <label className="text-2xl font-medium text-gray-700">Check-out Time</label>
            <input
              className="border-2 p-2 rounded-md w-full md:w-1/2 mt-2 focus:outline-none focus:ring-2 focus:bg-slate-600"
              type="text"
              placeholder="Check-out time"
              value={checkOut}
              onChange={ev => setcheckOut(ev.target.value)}
            />
          </div>

          {/* Price per Night */}
          <div className="flex  items-center gap-2">
            <label className="text-2xl font-medium text-gray-700">Price per Night</label>
            <input
              className="border-2 p-2 rounded-md w-full md:w-1/2 mt-2 focus:outline-none focus:ring-2 focus:bg-slate-600"
              type="text"
              placeholder="Price per night"
              value={price}
              onChange={ev => setprice(ev.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-slate-600 text-white p-3 rounded-2xl w-1/4 mx-auto block mt-6 transition-all"
          >
            Save Place
          </button>
        </div>
      </form>
    </>
  )
}

    </div>
  );
};


export default Places





