import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { useNavigate } from 'react-router-dom';

const UserSelection = ({ onUserSelect }) => {
  const { users, loading, error } = useStore(); // Access users from the store
  const [selectedUserId, setSelectedUserId] = useState('');
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const selectedUser = users.find((user) => user.id === parseInt(userId));
    setSelectedUserId(userId);
    
    if (selectedUser) {
      onUserSelect(selectedUser);
      navigate(`/user/${selectedUser.id}`); // Corrected to use selectedUser.id
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-3xl font-bold my-8">Select a User</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <select
          value={selectedUserId}
          onChange={handleUserChange}
          className="p-4 border border-purple-300 rounded-lg mb-5"
        >
          <option value="">-- Select a User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default UserSelection;
