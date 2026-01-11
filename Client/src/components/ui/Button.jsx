import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    to,
    onClick,
    type = 'button',
    disabled = false
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30",
        secondary: "bg-secondary-800 hover:bg-secondary-900 text-white shadow-md",
        outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
        ghost: "text-secondary-600 hover:text-primary-600 hover:bg-primary-50/50",
        white: "bg-white text-secondary-900 hover:bg-gray-50 shadow-md"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
        icon: "p-2"
    };

    const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={styles}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
