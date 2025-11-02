import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('user'); // 👈 default role

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
        role, // 👈 include role in request
      });
      alert('🎉 Registration successful! You can now log in.');
    } catch (error) {
      alert('⚠️ Registration failed. Please try again later.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
        
        {/* Header */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Create an Account ✨
        </h1>
        <p className="text-center text-gray-500 mb-6 italic">
          Join <span className="text-blue-600 font-semibold">Elegancia</span> and start your journey
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter your full name"
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 placeholder-gray-500 transition-all"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 placeholder-gray-500 transition-all"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Create a password"
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800 placeholder-gray-500 transition-all"
          />

          {/* 🔽 Role Selector */}
          <select
            value={role}
            onChange={(e) => setrole(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 transition-all"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-6 text-center text-gray-600">
          <p>
            Already a member?{' '}
            <Link
              to="/Login"
              className="text-blue-600 hover:text-blue-700 font-semibold underline transition-all duration-200"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
