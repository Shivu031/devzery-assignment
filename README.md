##### "User Post Interface Project" ####


### Overview
    This project is a user post interface built using React.js and Tailwind CSS with API integration. The app allows users to view posts, select specific users to see their posts, and create their own posts after a verification process. It implements features like pagination, comments, user profiles, and toast notifications.

### Features   
**User Selection:** Users can select a user from the homepage to view their posts. Post Display with Pagination: All posts are displayed with pagination, showing a limited number of posts per page.
**Comments for Posts:** Each post has a comments section that can be expanded to show more  comments or collapsed to show less.
**User Interface:** When a user is selected, their posts and profile are shown in a dedicated user interface.
**Post Creation with Verification:** Users must fill a verification form before creating a post. The form checks if the username and email match the user list.
**Toast Notification:** After successfully creating a post, a toast notification is displayed.
Footer: A footer is displayed on every page.

### Setup Instructions
1. **Create a new React app:**
   ```terminal
   npx create-react-app devzery-assignment
   cd devzery-assignment
2. **Install Tailwind CSS:**
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
3. **Configure Tailwind CSS:**
    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file structure
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    }
4. **Add Tailwind directives to index.css file:**
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
5. **Start the development server:**
    npm run start


# API Setup: Ensure the following APIs are correctly set up:
GET Users List API
GET Posts API
GET Comments API for each post
POST Create Post API

### Approach
1. The application is built with React.js using a component-based structure.
2. Tailwind CSS is used for styling to create a responsive design.
3. APIs are integrated using fetch requests to get the user list, posts, and comments, and to create new posts.
4. State management is handled with React hooks (useState, useEffect).
5. React Router is implemented to manage the routing and navigation. When a user is selected from the home page or click on author's name of any post, it navigates to userInterface where only their posts are visible.
6. The post creation process requires user verification to ensure the user exists before allowing post creation.

### Assumptions and Decisions
1. The user must be verified (username and email match the user list) before creating a post.
2. Pagination is used to limit the number of posts shown per page.
3. The application assumes all necessary APIs are up and running.

### Completed Features
1. Display of all users and posts on the home page.
2. User selection to view individual user profiles and posts.
3. Pagination for posts to improve user experience and performance.
4. A comments section with toggle to show more or less comments.
5. A post creation feature with verification form.
6. Footer across all pages.

### Known Issues
**Pagination:** Minor issues with pagination when data is dynamically updated.
**Verification:** If the user API is down, post creation may not work.
**Styling:** Some responsiveness issues on very small or very large screens.
