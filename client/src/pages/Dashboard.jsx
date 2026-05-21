import React, { useState, useEffect } from 'react';
import { authService, testService } from '../services/api';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await authService.getProfile();
        setProfile(profileData);
        
        const historyData = await testService.getHistory();
        setHistory(historyData);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data. Please login again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2 className="neon-text">Loading profile...</h2></div>;
  
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--error)' }}><h2>{error}</h2></div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto' }}>
      <h1 className="title neon-text">Profile Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginTop: '40px' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--accent), var(--purple))', margin: '0 auto 20px' }}></div>
          <h2>{profile?.username}</h2>
          <p className="neon-text-purple">Streak: {profile?.streak} Days</p>
        </div>
        
        <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <p style={{ color: 'var(--text-muted)' }}>Highest WPM</p>
            <h2 className="neon-text" style={{ fontSize: '2.5rem' }}>{profile?.highestWPM || 0}</h2>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)' }}>Average WPM</p>
            <h2 style={{ fontSize: '2.5rem' }}>{profile?.averageWPM || 0}</h2>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)' }}>Tests Completed</p>
            <h2 style={{ fontSize: '2.5rem' }}>{profile?.totalTests || 0}</h2>
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)' }}>Recent Tests</p>
            <h2 className="neon-text-purple" style={{ fontSize: '2.5rem' }}>{history.length}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
