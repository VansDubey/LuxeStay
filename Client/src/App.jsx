import './App.css'
import {createBrowserRouter} from "react-router-dom";
import {RouterProvider} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Accounts from './components/Accounts';
import Booking from './components/Booking';
import Places from './components/Places';
import Body from './pages/common/Body';
import axios from 'axios';
import PlacePage from './components/PlacePage';
import AllBooking from './components/AllBooking';
import SingleBooking from './components/SingleBooking';
import LuxeStay from './components/new';
import Navbar from './components/Navbar';

//will do the id one and editing thing at last
// axios.defaults.baseURL="http://localhost:5173";
axios.defaults.withCredentials = true;//using this for cookies

function App() {
 const router = createBrowserRouter([
  {
    path:'/',
    element:<><Body/></>
  },
  {
    path:'/Login',
    element:<><Login/></>
  },
  {
    path:'/register',
    element:<><Register/></>
  },
  {
    path:'/accounts/profile',
    element:<><Accounts/></>
  },
  {
    path:'/accounts/places/:ready?',
    element:<><Places/></>
  },{
    path:'/accounts/places/:ready/:id?',
    element:<><Places/></>

  },
  {
    path:'/accounts/book',
    element:<><Booking/></>
  },
  {
    path:'/places/:id',
    element:<><PlacePage/></>
  },
  {
    path:'/accounts/booking',
    element:<><AllBooking/></>
  },
  {
    path:'/accounts/booking/:id',
    element:<><SingleBooking/></>
  },
   {
    path:'/L',
    element:<><LuxeStay/></>
  },

 ])

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
