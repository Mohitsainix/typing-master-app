import React from 'react';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <motion.div 
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="title neon-text" style={{ textAlign: 'center', fontSize: '2rem' }}>Login</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
            />
          </div>
          <button className="btn btn-purple" style={{ marginTop: '10px' }}>Sign In</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
          Don't have an account? <span className="neon-text-purple" style={{ cursor: 'pointer' }}>Register</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
