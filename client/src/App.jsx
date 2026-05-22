import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import { wakeUpServer } from './services/api';

function App() {
  useEffect(() => {
    // Wake up Render backend on app load (free tier sleeps after inactivity)
    wakeUpServer();
  }, []);

  return (
    <Router>
      <div className="background-wrapper"></div>
      <Navbar />
      <main style={{ padding: '80px 20px 20px', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
