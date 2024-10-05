import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
            <div className="mb-4 md:mb-0">
                <a href="/dashboard" className="ml-4 text-white text-xl font-semibold hover:text-gray-400">Dashboard</a>
                <p className="text-sm">Creating modern web solutions.</p>
            </div>

          {/* Links */}
          <div className="flex space-x-6">
            <Link to="https://github.com/Shivu031" target="_blank" className="hover:text-white">GitHub</Link>
            <Link to="https://linkedin.com" target="_blank" className="hover:text-white">LinkedIn</Link>
            <Link to="https://instagram.com" target="_blank" className="hover:text-white">Instagram</Link>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Your Company</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
