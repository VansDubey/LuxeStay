import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary-50 border-t border-secondary-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Column */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary-500 rounded-lg p-1.5 text-white">
              <Globe size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
              LuxeStay
            </span>
          </Link>
          <p className="text-secondary-500 text-sm leading-relaxed">
            Discover the most luxurious and unique stays around the world. Experience comfort like never before.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Discover</h3>
          <ul className="space-y-3 text-secondary-500 text-sm">
            <li><Link to="/accounts/book" className="hover:text-primary-500 transition-colors">Apartments</Link></li>
            <li><Link to="/accounts/book" className="hover:text-primary-500 transition-colors">Luxury Villas</Link></li>
            <li><Link to="/accounts/book" className="hover:text-primary-500 transition-colors">Beach Houses</Link></li>
            <li><Link to="/accounts/book" className="hover:text-primary-500 transition-colors">Trending</Link></li>
          </ul>
        </div>

        {/* Links Column */}
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Support</h3>
          <ul className="space-y-3 text-secondary-500 text-sm">
            <li><Link to="/" className="hover:text-primary-500 transition-colors">Help Center</Link></li>
            <li><Link to="/" className="hover:text-primary-500 transition-colors">Safety Information</Link></li>
            <li><Link to="/" className="hover:text-primary-500 transition-colors">Cancellation Options</Link></li>
            <li><Link to="/" className="hover:text-primary-500 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter Column (Optional enhancement) */}
        <div>
          <h3 className="font-semibold text-secondary-900 mb-4">Stay Clean</h3>
          <p className="text-secondary-500 text-sm mb-4">Subscribe to get special offers and updates.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-white border border-secondary-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500"
            />
            <button className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              Join
            </button>
          </div>
        </div>

      </div>

      <div className="border-t border-secondary-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-400 text-sm">
            &copy; 2024 LuxeStay Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-secondary-500">
            <a href="#" className="hover:text-secondary-900">Privacy</a>
            <a href="#" className="hover:text-secondary-900">Terms</a>
            <a href="#" className="hover:text-secondary-900">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;