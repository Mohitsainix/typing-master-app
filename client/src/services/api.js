import axios from 'axios';

// HARDCODED to bypass any misconfigured Vercel environment variables
const API_URL = 'https://typing-master-app.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 15 second timeout to handle Render cold start
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-retry on Network Error (Render free tier cold start takes ~30s)
const MAX_RETRIES = 3;
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config) return Promise.reject(error);
    config._retryCount = config._retryCount || 0;
    // Retry on network errors or 503 (service unavailable = sleeping server)
    const shouldRetry = !error.response || error.response.status === 503;
    if (shouldRetry && config._retryCount < MAX_RETRIES) {
      config._retryCount += 1;
      const delay = config._retryCount * 3000; // 3s, 6s, 9s
      await new Promise(res => setTimeout(res, delay));
      return api(config);
    }
    return Promise.reject(error);
  }
);

// Call this once on app load to wake up the Render backend
export const wakeUpServer = async () => {
  try {
    await axios.get(API_URL.replace('/api', '/'), { timeout: 30000 });
  } catch (_) {
    // Silently ignore — just waking the server up
  }
};

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
