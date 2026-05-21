# Typing Master PRO - MERN Stack

A premium, modern, and gamified typing speed test application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 How to Run Locally

### Prerequisites
- Node.js installed (v16 or higher recommended)
- MongoDB installed locally or a free MongoDB Atlas URI

### 1. Backend Setup
1. Open a terminal and navigate to the server folder:
   ```bash
   cd "e:\Typing Master\typing-master-app\server"
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Check your `.env` file in the `server` directory. It should look like this:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/typing-master
   JWT_SECRET=supersecretkey_change_in_production
   NODE_ENV=development
   ```
   *(Ensure your local MongoDB instance is running, or replace the URI with your MongoDB Atlas connection string).*
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on http://localhost:5000*

### 2. Frontend Setup
1. Open a **new, separate terminal** and navigate to the client folder:
   ```bash
   cd "e:\Typing Master\typing-master-app\client"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to the local URL provided (usually `http://localhost:5173`).


---

## 🌍 How to Deploy (Production)

To deploy this application to the web so anyone can access it, you need to host the Backend, Frontend, and Database. Here is the recommended approach for a free/low-cost SaaS architecture:

### 1. Database Deployment (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Create a Database User and allow network access from anywhere (`0.0.0.0/0`).
3. Get your connection string (URI).

### 2. Backend Deployment (Render or Heroku)
*We recommend **Render.com** as it's free and easy to use.*
1. Push your code to a GitHub repository.
2. Sign up on [Render](https://render.com) and click "New Web Service".
3. Connect your GitHub repository and select the `server` folder as the root directory.
4. Set the build command to `npm install` and the start command to `node index.js`.
5. Add your Environment Variables (`MONGO_URI`, `JWT_SECRET`, `PORT`, `NODE_ENV=production`) in the Render dashboard.
6. Deploy! Render will give you a live URL (e.g., `https://typing-master-api.onrender.com`).

### 3. Frontend Deployment (Vercel or Netlify)
*We recommend **Vercel** for blazing-fast React/Vite hosting.*
1. Before deploying, you need to configure your React app to point to your new live Backend URL instead of `localhost:5000`. (You can set this up using Vite environment variables, e.g., `VITE_API_URL`).
2. Go to [Vercel](https://vercel.com) and click "Add New Project".
3. Import your GitHub repository.
4. Set the Root Directory to `client`.
5. The build settings will automatically be detected for Vite (Build command: `npm run build`, Output directory: `dist`).
6. Deploy! Vercel will give you a live frontend URL.
