import React from 'react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const dummyData = [
    { rank: 1, username: 'TypingGod99', wpm: 145, accuracy: 99 },
    { rank: 2, username: 'SpeedDemon', wpm: 138, accuracy: 98 },
    { rank: 3, username: 'KeyboardNinja', wpm: 132, accuracy: 100 },
    { rank: 4, username: 'FastFingers', wpm: 125, accuracy: 96 },
    { rank: 5, username: 'AverageJoe', wpm: 115, accuracy: 95 },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto' }}>
      <h1 className="title neon-text" style={{ textAlign: 'center' }}>Global Leaderboard</h1>
      
      <div className="glass-card" style={{ marginTop: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Rank</th>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>User</th>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>WPM</th>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((user) => (
              <motion.tr 
                key={user.rank}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: user.rank * 0.1 }}
                style={{ 
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: user.rank === 1 ? 'rgba(0, 240, 255, 0.1)' : 'transparent'
                }}
              >
                <td style={{ padding: '15px', fontWeight: 'bold' }}>
                  {user.rank === 1 ? <span className="neon-text">#1</span> : `#${user.rank}`}
                </td>
                <td style={{ padding: '15px' }}>{user.username}</td>
                <td style={{ padding: '15px', fontWeight: 'bold', color: 'var(--accent)' }}>{user.wpm}</td>
                <td style={{ padding: '15px' }}>{user.accuracy}%</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
