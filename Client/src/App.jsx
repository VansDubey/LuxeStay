import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

// Context
import { UserContextProvider } from './context/Usercontext';

// Common Pages
import Body from './pages/common/Body';
import Login from './pages/common/Login';
import Register from './pages/common/Register';
// import LuxeStay from './pages/common/LuxeStay';

// User Pages
import Accounts from './pages/user/Accounts';
import Booking from './pages/user/Booking';
import Places from './pages/user/Places';
import PlacePage from './pages/user/PlacePage';
import AllBooking from './pages/user/AllBooking';
import SingleBooking from './pages/user/SingleBooking';

// Protected Route
// import ProtectedRoute from './components/ProtectedRoute';

axios.defaults.withCredentials = true;

// ✅ Define Routes
const router = createBrowserRouter([
  // 🌍 Common Routes
  { path: '/', element: <Body /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  // { path: '/L', element: <LuxeStay /> },

  // 👤 User Routes (Protected)
  {
    path: '/accounts/profile',
    element: (
      // <ProtectedRoute allowedRoles={['user']}>
        <Accounts />
      // </ProtectedRoute>
    ),
  },
  {
    path: '/accounts/book',
    element: (
      // <ProtectedRoute allowedRoles={['user']}>
        <Booking />
      /* </ProtectedRoute> */
    ),
  },
  {
    path: '/accounts/places/:ready?',
    element: (
      // <ProtectedRoute allowedRoles={['user']}>
        <Places />
      // </ProtectedRoute>
    ),
  },
  {
    path: '/accounts/booking',
    element: (
      // <ProtectedRoute allowedRoles={['user']}>
        <AllBooking />
      // </ProtectedRoute>
    ),
  },
  {
    path: '/accounts/booking/:id',
    element: (
      // <ProtectedRoute allowedRoles={['user']}>
        <SingleBooking />
      // </ProtectedRoute>
    ),
  },
  {
    path: '/places/:id',
    element: (
    //   <ProtectedRoute allowedRoles={['user']}>
        <PlacePage />
      // </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
