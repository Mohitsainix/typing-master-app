import asyncHandler from 'express-async-handler';
import Test from '../models/Test.js';
import User from '../models/User.js';

// @desc    Save test score
// @route   POST /api/tests
// @access  Private
const saveTestScore = asyncHandler(async (req, res) => {
  const { wpm, accuracy, mistakes, mode, difficulty, duration } = req.body;

  if (wpm === undefined || accuracy === undefined || duration === undefined) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const test = await Test.create({
    user: req.user._id,
    wpm,
    accuracy,
    mistakes: mistakes || 0,
    mode: mode || 'timed',
    difficulty: difficulty || 'medium',
    duration,
  });

  // Update user stats with fallbacks for undefined/NaN values
  const user = await User.findById(req.user._id);
  
  const currentTotalTests = user.totalTests || 0;
  const currentHighestWPM = user.highestWPM || 0;
  const currentAverageWPM = user.averageWPM || 0;
  
  const totalTests = currentTotalTests + 1;
  const newHighestWPM = Math.max(currentHighestWPM, wpm);
  
  // Calculate new average WPM
  const newAverageWPM = Math.round(((currentAverageWPM * currentTotalTests) + wpm) / totalTests);

  user.totalTests = totalTests;
  user.highestWPM = newHighestWPM;
  user.averageWPM = newAverageWPM;
  
  // Basic streak logic
  user.streak = (user.streak || 0) + 1; 

  await user.save();

  res.status(201).json(test);
});

// @desc    Get user test history
// @route   GET /api/tests/history
// @access  Private
const getTestHistory = asyncHandler(async (req, res) => {
  const tests = await Test.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20);
  res.json(tests);
});

export { saveTestScore, getTestHistory };
