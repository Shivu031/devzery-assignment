import React from 'react';
import Navbar from '../components/Navbar';
import UserPosts from '../components/UserPosts';

const UserInterface = ({ user }) => {
  
  return (
    <div>
      <Navbar user={user}/>
      {/* Handle case where user is not available */}
      {user ? (
        <UserPosts selectedUser={user} />
      ) : (
        <p className="text-center text-gray-500">No user selected. Please go back and select a user.</p>
      )}
    </div>
  );
};

export default UserInterface;
