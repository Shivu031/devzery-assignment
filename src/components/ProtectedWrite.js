import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext'; // Assuming you have a store context for users
import Navbar from './Navbar';

const ProtectedWrite = () => {
  const { users } = useStore(); // Access users from the store
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission for checking username and email
  const handleSubmit = (e) => {
    e.preventDefault();

    // Find user with matching username and email
    const foundUser = users.find((user) => user.username === username && user.email === email);

    if (foundUser) {
      // User found, navigate to the write page
      navigate('/write');
    } else {
      // User not found, show an error
      setError('Invalid username or email. Please try again. Otherwise u can not write the post');
    }
  };

  return (
    <div>
        <Navbar/>
        <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 my-24">
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-900">Enter Credentials</h1>
                    <p className="mt-2 text-gray-600">for verification before creating post</p>
                </div>
                <div className="mt-5">
                    <form onSubmit={handleSubmit}>
                    <div className="relative mt-6">
                            <input type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            id="username" placeholder="Username" 
                            className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" 
                            autoComplete="NA" required />
                            <label htmlFor="username" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Username</label>
                        </div>
                        <div className="relative mt-6">
                            <input type="email" 
                            name="email" id="email" 
                            placeholder="Email Address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" 
                            autoComplete="NA" required />
                            <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                        </div>
                        <div className="my-6">
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <button type="submit" className="w-full rounded-full bg-black py-3 text-white focus:bg-gray-600 focus:outline-none">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProtectedWrite;
