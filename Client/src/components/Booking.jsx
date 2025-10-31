import React, { useEffect ,useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../Usercontext'
import { Moon, User } from "lucide-react";



const Booking = () => {
  const {user} = useContext(UserContext)
  const [places, setplaces] = useState([])
  useEffect(() => {
   axios.get('http://localhost:3000/places').then(response=>{
     setplaces(response.data);
     console.log(places);
   })
  }, [])

  return (
    
    <>      
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-7">
    {places.length > 0 && places.map(item => (
      <Link key={item._id} to={'/places/' + item._id} className=" p-2">
        <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
        <div className="h-[20vw] w-[30vw] rounded-lg overflow-hidden">
          {item.photos?.[0] && (
            <img src={item.photos[0]} className="h-full w-full object-cover" />
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600">{item.address}</p>
        <p className="mt-1 text-sm text-gray-700">{item.description}</p>
      </Link>
    ))}
  </div>
    </>

    
  
  )
}

export default Booking
