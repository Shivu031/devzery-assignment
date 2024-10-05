import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { useNavigate } from 'react-router-dom';

const PostList = ({onUserSelect}) => {
  const { posts, users, comments, loading, error } = useStore(); // Access comments from the store
  const navigate = useNavigate();
  const getUserById = (userId) => users.find((user) => user.id === userId);

  // State to manage comment visibility for each post
  const [showAllComments, setShowAllComments] = useState({});

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Toggle the visibility of comments for the current post
  const toggleCommentsVisibility = (postId) => {
    setShowAllComments((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Toggle the state between showing and hiding comments
    }));
  };

  // Get the current posts based on the page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Pagination buttons
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // When author name is clicked
  const handleAuthorClick = (user) => {
    onUserSelect(user);           // Set selected user
    navigate(`/user/${user.id}`);  // Navigate to the user's page
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-gray-700 font-bold mb-6 text-center font-serif">All Posts</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => {
              const author = getUserById(post.userId);
              const postComments = comments[post.id] || []; // Get comments for the current post

              return (
                <div
                  key={post.id}
                  className="bg-white border-2 border-fuchsia-300 shadow-lg shadow-fuchsia-300 rounded-lg p-6 hover:shadow-xl hover:shadow-fuchsia-300 transition-shadow"
                >
                  {/* Author Info */}
                  {author && (
                    <div className="flex items-center mb-4">
                      <img
                        src="/images/noAvatar.png"
                        alt={author.name}
                        className="w-10 h-10 rounded-full mr-4 border-2 border-purple-300"
                      />
                      <div>
                        <h4 className="text-lg text-pink-800 font-semibold cursor-pointer" onClick={() => handleAuthorClick(author)}>{author.name}</h4>
                        <p className="text-sm text-gray-500">{author.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Post Info */}
                  <h3 className="text-xl text-gray-600 font-medium mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.body}</p>

                  {/* Comments Section */}
                  <div className="mt-4">
                    <h4 className="text-lg text-cyan-800 font-semibold mb-2">Comments</h4>
                    {postComments.length > 0 ? (
                      <>
                        {showAllComments[post.id] ? (
                          <>
                            {postComments.map((comment) => (
                              <div key={comment.id} className="flex items-start mb-2">
                                <img
                                  src="/images/noAvatar.png"
                                  alt={comment.name}
                                  className="w-8 h-8 rounded-full mr-3 border-2 border-purple-300"
                                />
                                <div>
                                  <p className="text-gray-600 font-semibold">{comment.name}</p>
                                  <p className="text-gray-600 text-sm">{comment.body}</p>
                                </div>
                              </div>
                            ))}
                            <button
                              onClick={() => toggleCommentsVisibility(post.id)}
                              className="text-teal-500"
                            >
                              Show Less Comments
                            </button>
                          </>
                        ) : (
                          <>
                            <div key={postComments[0].id} className="flex items-start mb-2">
                              <img
                                src="/images/noAvatar.png"
                                alt={postComments[0].name}
                                className="w-8 h-8 rounded-full mr-3 border-2 border-purple-300"
                              />
                              <div>
                                <p className="text-gray-600 font-semibold">{postComments[0].name}</p>
                                <p className="text-gray-600 text-sm">{postComments[0].body}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleCommentsVisibility(post.id)}
                              className="text-teal-500"
                            >
                              Show More Comments
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-500">No comments yet.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-center mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mr-2 rounded-md ${
                currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
              }`}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === i + 1 ? 'bg-teal-600 text-white' : 'bg-blue-500 text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 ml-2 rounded-md ${
                currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
