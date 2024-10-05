import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Write = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, body };

    try {
      // Make the POST request to the API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      // Check if the request was successful
      if (response) {
        const result = await response.json();
        console.log('Post submitted:', result);
        toast.success("Post created successfully");
        setTimeout(() => {
          // After submission, navigate to another page like the home or posts list
          navigate('/');
        }, 1500); // Redirect after 1 seconds
      } else {
        console.error('Failed to submit post:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } 
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-24">
        <h1 className="text-3xl text-gray-600 font-medium text-center mb-3">Write a New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-lg font-semibold">Body:</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="6"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Write;
