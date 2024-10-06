// const Footer = () => {
//   return (
//     <footer className="bg-[#30415A] text-white py-4">
//       <div className="container mx-auto flex md:flex-row justify-center items-center space-y-4 md:space-y-0">
//         <div className="text-center md:text-left">
//           <p className="text-sm mt-1">
//             Copyright © 2023 - All right reserved by Car Washing Booking System
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer Top: Brand and Links */}
        <div className="md:flex md:justify-between mb-8">
          {/* Brand Section */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-white mb-2">Car Wash Co.</h2>
            <p className="text-gray-400">Making your car shine like new!</p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-between space-x-12">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
              <ul>
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
              <ul>
                <li><span className="text-gray-400">Phone:</span> <a href="tel:+123456789" className="text-gray-400 hover:text-white">+123 456 789</a></li>
                <li><span className="text-gray-400">Email:</span> <a href="mailto:info@carwash.com" className="text-gray-400 hover:text-white">info@carwash.com</a></li>
                <li><span className="text-gray-400">Address:</span> <a className="text-gray-400 hover:text-white">123 Car Wash St, City, Country</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Middle: Newsletter Signup */}
        {/* <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-4">Sign up for our newsletter and stay updated on new promotions and services.</p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800"
            />
            <button className="bg-yellow-500 px-4 py-2 text-white rounded-r-lg hover:bg-yellow-600">Subscribe</button>
          </div>
        </div> */}

        {/* Footer Bottom: Social Media and Copyright */}
        <div className="flex justify-between items-center">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FiFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FiInstagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FiTwitter size={24} />
            </a>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-gray-400">&copy; 2024 Car Wash Co. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
