import React from 'react';
import { motion } from 'framer-motion';
import TypingEngine from '../components/TypingEngine';

const Home = () => {
  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-section" style={{ textAlign: 'center', marginBottom: '50px', marginTop: '40px' }}>
        <h1 className="title">Master Your <span className="neon-text">Typing</span> Skills</h1>
        <p className="subtitle">Compete, level up, and become the ultimate Typist.</p>
        
        <div className="mode-selector" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
          <button className="btn">15s</button>
          <button className="btn">30s</button>
          <button className="btn btn-purple">60s</button>
          <button className="btn">120s</button>
        </div>
      </div>

      <TypingEngine />
    </motion.div>
  );
};

export default Home;
