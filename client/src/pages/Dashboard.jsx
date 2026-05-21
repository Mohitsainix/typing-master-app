import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto' }}>
      <h1 className="title neon-text">Profile Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginTop: '40px' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--accent), var(--purple))', margin: '0 auto 20px' }}></div>
          <h2>TypingGod99</h2>
          <p className="neon-text-purple">Level 42 Master</p>
        </div>
        
        <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <p style={{ color: 'var(--text-muted)' }}>Highest WPM</p>
            <h2 className="neon-text" style={{ fontSize: '2.5rem' }}>145</h2>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)' }}>Average WPM</p>
            <h2 style={{ fontSize: '2.5rem' }}>112</h2>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)' }}>Tests Completed</p>
            <h2 style={{ fontSize: '2.5rem' }}>1,432</h2>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)' }}>Current Streak</p>
            <h2 className="neon-text-purple" style={{ fontSize: '2.5rem' }}>14 Days</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
