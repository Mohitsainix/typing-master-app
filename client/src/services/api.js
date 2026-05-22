import axios from 'axios';

// Use the VITE_API_URL env var in production (Render/Vercel deployment)
// Fallback: hardcoded local IP so every device on the same WiFi can connect
const API_URL = import.meta.env.VITE_API_URL || 'http://172.20.10.2:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the JWT token to requests
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
  },
  register: async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    if (response.data) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('userInfo');
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

export const testService = {
  saveScore: async (testData) => {
    const response = await api.post('/tests', testData);
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get('/tests/history');
    return response.data;
  }
};

export const leaderboardService = {
  getGlobalLeaderboard: async () => {
    const response = await api.get('/leaderboard');
    return response.data;
  }
};

export default api;
