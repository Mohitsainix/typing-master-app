import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TypingEngine from '../components/TypingEngine';

const Home = () => {
  const [timeLimit, setTimeLimit] = useState(60);

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
          {[15, 30, 60, 120].map(time => (
            <button 
              key={time} 
              className={`btn ${timeLimit === time ? 'btn-purple' : ''}`}
              onClick={() => setTimeLimit(time)}
            >
              {time}s
            </button>
          ))}
        </div>
      </div>

      <TypingEngine timeLimit={timeLimit} />
    </motion.div>
  );
};

export default Home;
