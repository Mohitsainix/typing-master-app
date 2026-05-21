import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { leaderboardService } from '../services/api';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const result = await leaderboardService.getGlobalLeaderboard();
        setData(result);
      } catch (err) {
        setError('Failed to fetch leaderboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2 className="neon-text">Loading leaderboard...</h2></div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--error)' }}><h2>{error}</h2></div>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto' }}>
      <h1 className="title neon-text" style={{ textAlign: 'center' }}>Global Leaderboard</h1>
      
      <div className="glass-card" style={{ marginTop: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Rank</th>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>User</th>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Highest WPM</th>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Average WPM</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No records found.</td></tr>
            ) : (
              data.map((user, index) => (
                <motion.tr 
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: index === 0 ? 'rgba(0, 240, 255, 0.1)' : 'transparent'
                  }}
                >
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>
                    {index === 0 ? <span className="neon-text">#1</span> : `#${index + 1}`}
                  </td>
                  <td style={{ padding: '15px' }}>{user.username}</td>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: 'var(--accent)' }}>{user.highestWPM}</td>
                  <td style={{ padding: '15px' }}>{user.averageWPM}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
