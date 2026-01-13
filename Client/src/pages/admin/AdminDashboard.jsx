import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/Usercontext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Users, Home, Calendar, Briefcase, PlusCircle, TrendingUp } from 'lucide-react';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
    const { user } = useContext(UserContext);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPlaces: 0,
        totalBookings: 0,
        revenue: 0 // Mock revenue for now as it would need more backend work
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                // These would ideally be real aggregation endpoints, but we'll fetch lists for now to simple count
                // Note: This relies on the admin having access to view all places/bookings
                const placesRes = await axios.get('http://localhost:3000/places');
                const bookingsRes = await axios.get('http://localhost:3000/profilebooking'); // admin can see all bookings on this endpoint

                // Mocking user count or assuming we might add an endpoint. 
                // For now, let's just use placeholder or derived data if possible.
                // Since we don't have a /users endpoint yet, we'll dummy that one.

                const places = placesRes.data;
                const bookings = bookingsRes.data;

                setStats({
                    totalUsers: 142, // Mock data
                    totalPlaces: places.length,
                    totalBookings: bookings.length,
                    revenue: bookings.reduce((acc, curr) => acc + (curr.price || 0), 0)
                });

            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === 'admin') {
            fetchStats();
        }
    }, [user]);

    return (
        <div className="bg-secondary-50 min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 mt-[80px]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-secondary-900">Admin Dashboard</h1>
                        <p className="text-secondary-500 mt-2">Welcome back, {user?.name}. Here's what's happening today.</p>
                    </div>
                    <Button to="/accounts/places/new" className="gap-2 shadow-lg hover:shadow-xl transition-all">
                        <PlusCircle size={20} /> Add New Place
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading stats...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

                        {/* Stat Card 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl"><Users size={24} /></div>
                                <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-bold">+12%</span>
                            </div>
                            <h3 className="text-3xl font-bold text-secondary-900 mb-1">{stats.totalUsers}</h3>
                            <p className="text-secondary-500 font-medium text-sm">Total Users</p>
                        </div>

                        {/* Stat Card 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-purple-50 text-purple-600 p-3 rounded-xl"><Home size={24} /></div>
                                <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-bold">+5%</span>
                            </div>
                            <h3 className="text-3xl font-bold text-secondary-900 mb-1">{stats.totalPlaces}</h3>
                            <p className="text-secondary-500 font-medium text-sm">Active Properties</p>
                        </div>

                        {/* Stat Card 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-orange-50 text-orange-600 p-3 rounded-xl"><Briefcase size={24} /></div>
                                <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-bold">+24%</span>
                            </div>
                            <h3 className="text-3xl font-bold text-secondary-900 mb-1">{stats.totalBookings}</h3>
                            <p className="text-secondary-500 font-medium text-sm">Total Bookings</p>
                        </div>

                        {/* Stat Card 4 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-green-50 text-green-600 p-3 rounded-xl"><TrendingUp size={24} /></div>
                                <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-bold">+18%</span>
                            </div>
                            <h3 className="text-3xl font-bold text-secondary-900 mb-1">${stats.revenue.toLocaleString()}</h3>
                            <p className="text-secondary-500 font-medium text-sm">Total Revenue</p>
                        </div>
                    </div>
                )}

            </div>
            <Footer />
        </div>
    )
}

export default AdminDashboard
