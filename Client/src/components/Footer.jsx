import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100  flex flex-col md:flex-row justify-around flex-wrap">
      <div className="w-full md:w-auto mb-8 md:mb-0 p-12"> {/* Logo and Description */}
        <div className="flex items-center mb-4">
          {/* <img src="your_logo.png" alt="Your Logo" className="h-12 mr-2" /> Adjust height as needed */}
          <span className="text-xl font-bold">YourHouseRentals.com</span>
        </div>
        <p className="text-gray-600 mb-4">Making finding your perfect home easier than ever.</p>
        <div className="flex"> {/* Social Icons */}
            <a href="#" className="text-gray-500 hover:text-gray-700 mr-4">
                <i className="fab fa-facebook fa-lg"></i> {/* Example: Facebook */}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 mr-4">
                <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 mr-4">
                <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-youtube fa-lg"></i>
            </a>
        </div>
      </div>

      <div className="w-full md:w-auto mb-8 md:mb-0"> {/* Rentals */}
        <h3 className="font-semibold text-gray-700 mb-2">Rentals</h3>
        <ul className="text-gray-500">
          <li className="mb-1"><a href="#" className="hover:text-blue-500">Apartments</a></li>
          <li className="mb-1"><a href="#" className="hover:text-blue-500">Houses</a></li>
          <li className="mb-1"><a href="#" className="hover:text-blue-500">Villas</a></li>
          <li><a href="#" className="hover:text-blue-500">Short-Term Stays</a></li>
        </ul>
      </div>

      <div className="w-full md:w-auto mb-8 md:mb-0"> {/* Support */}
        <h3 className="font-semibold text-gray-700 mb-2">Support</h3>
        <ul className="text-gray-500">
          <li className="mb-1"><a href="#" className="hover:text-blue-500">Contact Us</a></li>
          <li className="mb-1"><a href="#" className="hover:text-blue-500">FAQ</a></li>
          <li className="mb-1"><a href="#" className="hover:text-blue-500">Help Center</a></li>
          <li><a href="#" className="hover:text-blue-500">Submit a Request</a></li>
        </ul>
      </div>

      <div className="w-full md:w-auto mb-8 md:mb-0"> {/* Company */}
        <h3 className="font-semibold text-gray-700 mb-2">Company</h3>
        <ul className="text-gray-500">
          <li className="mb-1"><a href="#" className="hover:text-blue-500">About Us</a></li>
          <li className="mb-1"><a href="#" className="hover:text-blue-500">Blog</a></li>
          <li className="mb-1"><a href="#" className="hover:text-blue-500">Careers</a></li>
          <li><a href="#" className="hover:text-blue-500">Press</a></li>
        </ul>
      </div>

      <div className="w-full md:w-auto"> {/* Legal */}
        <h3 className="font-semibold text-gray-700 mb-2">Legal</h3>
        <ul className="text-gray-500">
          <li className="mb-1"><a href="#" className="hover:text-blue-500">Terms of Service</a></li>
          <li className="mb-1"><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-500">Disclaimer</a></li>
        </ul>
      </div>

      <div className="w-[100vw] text-center py-4 bg-gray-200 mt-8 "> {/* Bottom Bar */}
        &copy; 2024 YourHouseRentals.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;