import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/Usercontext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';
import { LogOut, User, MapPin, Calendar, Plus, Users, TrendingUp, Briefcase } from 'lucide-react';

const Accounts = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [places, setPlaces] = useState([]);

  // Admin Stats State
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlaces: 0,
    totalBookings: 0,
    revenue: 0
  });
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    // User Data Fetch
    if (user && user.role !== 'admin') {
      axios.get('http://localhost:3000/profilebooking').then(response => {
        setBookings(response.data);
      });
      axios.get('http://localhost:3000/user-places').then(response => {
        setPlaces(response.data);
      });
    }

    // Admin Stats Fetch
    if (user && user.role === 'admin') {
      const fetchStats = async () => {
        setLoadingStats(true);
        try {
          const placesRes = await axios.get('http://localhost:3000/places');
          const bookingsRes = await axios.get('http://localhost:3000/profilebooking'); // admin endpoint assumption
          const placesData = placesRes.data;
          const bookingsData = bookingsRes.data;

          setStats({
            totalUsers: 142, // Mock
            totalPlaces: placesData.length,
            totalBookings: bookingsData.length,
            revenue: bookingsData.reduce((acc, curr) => acc + (curr.price || 0), 0)
          });
        } catch (error) {
          console.error("Failed to fetch admin stats", error);
        } finally {
          setLoadingStats(false);
        }
      };
      fetchStats();
    }
  }, [user]); // Re-run if user changes (e.g. login)

  async function logout() {
    await axios.post('http://localhost:3000/logout');
    setUser(null);
    setRedirect('/');
  }

  if (!ready) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (ready && !user && !redirect) return <Navigate to='/login' />;
  if (redirect) return <Navigate to={redirect} />;

  return (
    <div className="bg-secondary-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-10 py-12 mt-[80px]">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-secondary-900">{user.role === 'admin' ? 'Admin Dashboard' : 'My Profile'}</h1>
            <p className="text-secondary-500 mt-1">
              {user.role === 'admin' ? `Welcome back, ${user.name}. Here's what's happening today.` : 'Manage your profile, bookings, and listings.'}
            </p>
          </div>
          <Button onClick={logout} variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300">
            <LogOut size={18} className="mr-2" /> Log out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar / Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary-100 text-center sticky top-28">
              <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                {user.name?.[0]?.toUpperCase() || <User size={40} />}
              </div>
              <h2 className="text-xl font-bold text-secondary-900">{user.name}</h2>
              <p className="text-secondary-500 text-sm mb-6 capitalize">{user.role}</p>
              {/* 
              <div className="space-y-3">
                 <Button to="/accounts/profile" variant="secondary" className="w-full justify-start">
                  <User size={18} className="mr-2" /> Edit Profile
                </Button> 
              </div>
                 */}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-10">

            {/* ADMIN CONTENT */}
            {user.role === 'admin' && (
              loadingStats ? (
                <div className="text-center py-20">Loading stats...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {/* Stat Card 1 */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-50 text-blue-600 p-3 rounded-xl"><Users size={24} /></div>
                      {/* <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-bold">+12%</span> */}
                    </div>
                    <h3 className="text-3xl font-bold text-secondary-900 mb-1">{stats.totalUsers}</h3>
                    <p className="text-secondary-500 font-medium text-sm">Total Users</p>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-purple-50 text-purple-600 p-3 rounded-xl"><MapPin size={24} /></div>
                    </div>
                    <h3 className="text-3xl font-bold text-secondary-900 mb-1">{stats.totalPlaces}</h3>
                    <p className="text-secondary-500 font-medium text-sm">Active Properties</p>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-orange-50 text-orange-600 p-3 rounded-xl"><Briefcase size={24} /></div>
                    </div>
                    <h3 className="text-3xl font-bold text-secondary-900 mb-1">{stats.totalBookings}</h3>
                    <p className="text-secondary-500 font-medium text-sm">Total Bookings</p>
                  </div>

                  {/* Stat Card 4 */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-green-50 text-green-600 p-3 rounded-xl"><TrendingUp size={24} /></div>
                    </div>
                    <h3 className="text-3xl font-bold text-secondary-900 mb-1">${stats.revenue.toLocaleString()}</h3>
                    <p className="text-secondary-500 font-medium text-sm">Total Revenue</p>
                  </div>
                </div>
              )
            )}

            {/* USER CONTENT (Only if NOT admin) */}
            {user.role !== 'admin' && (
              <>
                {/* My Bookings Section */}
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-secondary-900">Recent Bookings</h2>
                    <Link to="/accounts/booking" className="text-primary-600 font-medium hover:underline text-sm">View all</Link>
                  </div>

                  {bookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bookings.slice(0, 4).map(booking => (
                        <Link key={booking._id} to={`/accounts/booking/${booking._id}`} className="block bg-white p-4 rounded-xl shadow-sm border border-secondary-100 hover:shadow-md transition group">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-secondary-200 rounded-lg overflow-hidden flex-shrink-0">
                              {booking.place?.photos?.[0] && (
                                <img src={booking.place.photos[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold text-secondary-900 line-clamp-1">{booking.place?.name || "Unknown Place"}</h3>
                              <p className="text-secondary-500 text-sm flex items-center gap-1 mt-1">
                                <Calendar size={14} /> {new Date(booking.checkin).toLocaleDateString()}
                              </p>
                              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">
                                Confirmed
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-8 text-center border border-dashed border-secondary-300">
                      <p className="text-secondary-500 mb-4">You haven't made any bookings yet.</p>
                      <Button to="/">Find a place to stay</Button>
                    </div>
                  )}
                </section>
              </>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Accounts;
