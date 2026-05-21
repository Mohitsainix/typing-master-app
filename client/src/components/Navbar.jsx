import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Keyboard, Trophy, User, LogIn, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '../services/api';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To force re-render on navigation
  const userInfo = localStorage.getItem('userInfo');

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <motion.nav 
      className="navbar glass-card"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-brand">
        <Link to="/">
          <Keyboard className="brand-icon" />
          <span className="neon-text">TypingMaster<span className="neon-text-purple">PRO</span></span>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/leaderboard" className="nav-item">
          <Trophy size={18} />
          <span>Leaderboard</span>
        </Link>
        <Link to="/dashboard" className="nav-item">
          <User size={18} />
          <span>Profile</span>
        </Link>
        {userInfo ? (
          <button onClick={handleLogout} className="btn" style={{ background: 'transparent' }}>
            <LogOut size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn">
            <LogIn size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Login
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
