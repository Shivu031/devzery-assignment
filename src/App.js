import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSelection from './components/UserSelection';
import PostList from './components/PostList';
import Footer from './components/Footer';
import UserInterface from './pages/UserInterface';
import UserSetting from './pages/UserSetting';
import Write from './pages/Write';
import ProtectedWrite from './components/ProtectedWrite';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-200">
        <Routes>
          {/* Home page showing user selection and all posts */}
          <Route
            path="/"
            element={
              <div>
                <UserSelection onUserSelect={setSelectedUser} />
                <PostList onUserSelect={setSelectedUser} />
              </div>
            }
          />

          {/* User Interface for selected user */}
          <Route
            path="/user/:userId"
            element={<UserInterface user={selectedUser} />}
          />
          {/* User Detail page */}
          <Route
            path="/userDetails/:userId"
            element={<UserSetting />} 
          />
          <Route path="/write" element={<Write/>} />
          <Route path="/protected-write" element={<ProtectedWrite />} />
        </Routes>
        
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
