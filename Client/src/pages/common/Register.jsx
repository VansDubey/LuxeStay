import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Globe } from 'lucide-react';

const Register = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('user');
  const [redirect, setredirect] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
        role,
      });
      alert('🎉 Registration successful! You can now log in.');
      setredirect(true);
    } catch (error) {
      alert('⚠️ Registration failed. Please try again later.');
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-secondary-900 relative justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop"
          alt="Luxury Resort"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-white p-12 text-center max-w-xl">
          <h2 className="text-4xl font-serif font-bold mb-6">Join the LuxeStay Community</h2>
          <p className="text-lg text-gray-200">Unlock exclusive access to the world's most breathtaking properties and seamless travel experiences.</p>
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
            <h1 className="text-3xl font-bold text-secondary-900 tracking-tight">Create an account</h1>
            <p className="mt-2 text-secondary-500">Sign up locally or via social options.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="name@example.com"
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
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">I want to</label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                  >
                    <option value="user">Book places (Traveler)</option>
                    <option value="admin">Host places (Admin/Host)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary-500/30"
            >
              Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-secondary-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
