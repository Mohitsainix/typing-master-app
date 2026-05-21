import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await authService.login(formData.email, formData.password);
      } else {
        await authService.register(formData.username, formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="title neon-text" style={{ textAlign: 'center', fontSize: '2rem' }}>
          {isLogin ? 'Login' : 'Register'}
        </h2>
        
        {error && (
          <div style={{ background: 'var(--error)', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Username</label>
              <input 
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username" 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
              />
            </div>
          )}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email" 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password" 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-purple" style={{ marginTop: '10px' }}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            className="neon-text-purple" 
            style={{ cursor: 'pointer' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
