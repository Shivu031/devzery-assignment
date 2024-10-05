import React, { createContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Users first
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!usersResponse) {
          throw new Error('Failed to fetch users.');
        }
        const usersData = await usersResponse.json();
        setUsers(usersData);

        // Fetch Posts after Users
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!postsResponse) {
          throw new Error('Failed to fetch posts.');
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Fetch Comments after Posts
        const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!commentsResponse) {
          throw new Error('Failed to fetch comments.');
        }
        const commentsData = await commentsResponse.json();

        // Organize comments by post ID
        const commentsByPost = commentsData.reduce((acc, comment) => {
          const { postId } = comment;
          if (!acc[postId]) {
            acc[postId] = [];
          }
          acc[postId].push(comment);
          return acc;
        }, {});

        setComments(commentsByPost);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <StoreContext.Provider value={{ posts, users, comments, loading, error }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => React.useContext(StoreContext);
