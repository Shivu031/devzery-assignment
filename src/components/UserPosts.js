import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';

const UserPosts = ({ selectedUser }) => {
  const { posts, comments } = useStore(); // Access data from the store

  // State to manage comment visibility for each post
  const [showAllComments, setShowAllComments] = useState({});

  // Toggle the visibility of comments for the current post
  const toggleCommentsVisibility = (postId) => {
    setShowAllComments((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Toggle between true and false for each post
    }));
  };

  // Check if a user is selected
  if (!selectedUser) {
    return <p className="text-center text-gray-500">Please select a user to view posts.</p>;
  }

  // Filter posts for the selected user
  const userPosts = posts.filter((post) => post.userId === selectedUser.id);

  return (
    <div>
      <h2 className="text-center font-bold text-3xl my-5">Posts of {selectedUser.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {userPosts.length > 0 ? (
          userPosts.map((post) => {
            const postComments = comments[post.id] || []; // Get comments for the current post

            return (
              <div
                key={post.id}
                className="bg-white border-2 border-fuchsia-300 shadow-lg shadow-fuchsia-300 rounded-lg p-6 hover:shadow-xl hover:shadow-fuchsia-300 transition-shadow"
              >
                {/* Post Info */}
                <h3 className="text-xl text-gray-600 font-semibold mb-2">{post.title}</h3>
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
                            Show Less
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
                          {postComments.length > 1 && (
                            <button
                              onClick={() => toggleCommentsVisibility(post.id)}
                              className="text-teal-500"
                            >
                              Show More Comments
                            </button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
