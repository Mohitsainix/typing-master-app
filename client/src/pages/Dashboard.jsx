import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { authService, testService } from '../services/api';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const profileData = await authService.getProfile();
      setProfile(profileData);
      setEditBio(profileData.bio || '');
      setEditAvatar(profileData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${profileData.username}`);
      
      const historyData = await testService.getHistory();
      setHistory(historyData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAvatar = () => {
    const styles = ['bottts', 'adventurer', 'avataaars', 'fun-emoji', 'lorelei'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomSeed = Math.random().toString(36).substring(7);
    setEditAvatar(`https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updatedProfile = await authService.updateProfile({
        bio: editBio,
        avatar: editAvatar
      });
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2 className="neon-text">Loading profile...</h2></div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--error)' }}><h2>{error}</h2></div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="title neon-text">Profile Dashboard</h1>
        <button className="btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginTop: '40px' }}>
        <div className="glass-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img 
            src={profile?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.username}`} 
            alt="Profile Avatar" 
            style={{ width: '150px', height: '150px', borderRadius: '50%', border: '4px solid var(--purple)', objectFit: 'cover', marginBottom: '20px', background: '#fff' }} 
          />
          <h2 style={{ marginBottom: '5px' }}>{profile?.username}</h2>
          <p className="neon-text-purple" style={{ marginBottom: '15px', fontWeight: 'bold' }}>Streak: {profile?.streak || 0} Days</p>
          {profile?.bio && (
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', width: '100%', fontStyle: 'italic', color: 'var(--text-muted)' }}>
              "{profile.bio}"
            </div>
          )}
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

      {isEditing && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card" 
            style={{ width: '90%', maxWidth: '500px', background: '#111827' }}
          >
            <h2 className="neon-text" style={{ marginBottom: '20px' }}>Edit Profile</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
              <img src={editAvatar} alt="Preview" style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#fff', marginBottom: '15px', border: '3px solid var(--purple)' }} />
              <button type="button" className="btn btn-purple" style={{ padding: '8px 15px', fontSize: '0.9rem' }} onClick={handleGenerateAvatar}>
                🎲 Generate Random Avatar
              </button>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label>Bio (Optional)</label>
              <textarea 
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Tell us about your typing journey..."
                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', minHeight: '100px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button className="btn" style={{ background: 'transparent', border: '1px solid var(--text-muted)' }} onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="btn btn-purple" onClick={handleSaveProfile} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
