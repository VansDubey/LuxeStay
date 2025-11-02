import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Usercontext';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('user'); // 👈 new
  const [redirect, setredirect] = useState(false);
  const { setuser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
        role, // 👈 include role
      });
      setuser(response.data);
      alert('✅ Login successful!');
      setredirect(true);
    } catch (e) {
      alert('❌ Login failed. Please check your credentials.');
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200/50 transition-all duration-300 hover:shadow-2xl">
        
        {/* Header */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-6 italic">
          Login to continue with <span className="text-blue-600 font-semibold">Elegancia</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
            placeholder="Enter your password"
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
            Login
          </button>
        </form>

        {/* Register Redirect */}
        <div className="mt-6 text-center text-gray-600">
          <p>
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold underline transition-all duration-200"
            >
              Register Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
