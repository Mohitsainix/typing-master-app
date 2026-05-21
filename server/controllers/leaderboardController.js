import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Get global leaderboard
// @route   GET /api/leaderboard
// @access  Public
const getGlobalLeaderboard = asyncHandler(async (req, res) => {
  // Get top 50 users based on highestWPM
  const topUsers = await User.find({})
    .sort({ highestWPM: -1 })
    .limit(50)
    .select('username highestWPM averageWPM totalTests avatar');
    
  res.json(topUsers);
});

export { getGlobalLeaderboard };
