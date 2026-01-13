import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/Usercontext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, ready } = useContext(UserContext);
    const location = useLocation();

    if (!ready) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Or a spinner
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If allowedRoles is provided, check if user has the role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // User is logged in but doesn't have permission
        // Provide a way to go back or go home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;