import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

// Context
import { UserContextProvider } from './context/Usercontext';

// Common Pages
import Body from './pages/common/Body';
import Login from './pages/common/Login';
import Register from './pages/common/Register';

// User Pages
import Accounts from './pages/user/Accounts';
import Booking from './pages/user/Booking';
import Places from './pages/user/Places';
import PlacePage from './pages/user/PlacePage';
import AllBooking from './pages/user/AllBooking';
import SingleBooking from './pages/user/SingleBooking';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';

axios.defaults.withCredentials = true;

// ✅ Define Routes
const router = createBrowserRouter([
  // 🌍 Common Routes (Public)
  { path: '/', element: <Body /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/places/:id', element: <PlacePage /> }, // Publicly viewable details

  // 👤 User Routes (Protected: User & Admin can access profile/bookings)
  {
    path: '/accounts/profile',
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <Accounts />
      </ProtectedRoute>
    ),
  },
  {
    path: '/accounts/book',
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <Booking />
      </ProtectedRoute>
    ),
  },
  {
    path: '/accounts/booking',
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <AllBooking />
      </ProtectedRoute>
    ),
  },
  {
    path: '/accounts/booking/:id',
    element: (
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <SingleBooking />
      </ProtectedRoute>
    ),
  },

  // 🛠️ Admin Routes (Protected: Admin Only)
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/accounts/places/:ready?', // List & Add/Edit Form
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Places />
      </ProtectedRoute>
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
