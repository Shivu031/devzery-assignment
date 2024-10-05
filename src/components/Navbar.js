import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({user}) => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    if (user) {
      navigate(`/userDetails/${user.id}`); // Navigate to the user detail page
    }
  };

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Dashboard */}
          <div className="flex items-center">
            <Link to="/" className="ml-4 text-white text-xl font-semibold hover:text-gray-400">Dashboard</Link>
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
          <Link to="/protected-write" className="text-white font-medium hover:text-gray-400">Write</Link>
            <div className="flex-1 mx-2 md:mx-4">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <img
              src="/images/noAvatar.png"
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover cursor-pointer"
              onClick={handleProfileClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
