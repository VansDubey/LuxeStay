import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/Usercontext';
import { Globe } from 'lucide-react';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('user');
  const [redirect, setredirect] = useState(false);
  const { setuser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
        role,
      });
      setuser(response.data);
      // alert('✅ Login successful!');
      setredirect(true);
    } catch (e) {
      alert('❌ Login failed. Please check your credentials.');
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-secondary-900 relative justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-white p-12 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Welcome Back to LuxeStay</h2>
          <p className="text-lg text-gray-200">Experience the world's most extraordinary homes and unique stays.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="bg-primary-500 rounded-lg p-1.5 text-white">
                <Globe size={24} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-secondary-900">LuxeStay</span>
            </Link>
            <h1 className="text-3xl font-bold text-secondary-900 tracking-tight">Log in to your account</h1>
            <p className="mt-2 text-secondary-500">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Account Type</label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                  >
                    <option value="user">Traveler (User)</option>
                    <option value="admin">Host (Admin)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-600">Remember for 30 days</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary-500/30"
            >
              Sign in
            </button>
          </form>

          <div className="text-center">
            <p className="text-secondary-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-500 hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
