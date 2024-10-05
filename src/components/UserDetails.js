import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/StoreContext'; // Adjust the import path as necessary

const UserDetails = () => {
  const { userId } = useParams(); // Get userId from the URL parameters
  const { users } = useStore(); // Assuming you have user data in your store

  // Find the user with the matching ID
  const user = users.find((user) => user.id === parseInt(userId));

  if (!user) {
    return <p className="text-center text-gray-500 my-11">User not found.</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg my-11 shadow-rose-300">
      <h2 className="text-2xl text-gray-700 font-semibold mb-4">{user.name}</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{user.website}</a></p>
      <h3 className="mt-4 text-lg text-gray-800 font-semibold">Address</h3>
      <p>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
      <p><strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p>
      <h3 className="mt-4 text-lg text-gray-800 font-semibold">Company</h3>
      <p><strong>Name:</strong> {user.company.name}</p>
      <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
      <p><strong>BS:</strong> {user.company.bs}</p>
    </div>
  );
};

export default UserDetails;
