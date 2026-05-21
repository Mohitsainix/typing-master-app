import express from 'express';
const router = express.Router();
import { getGlobalLeaderboard } from '../controllers/leaderboardController.js';

router.route('/').get(getGlobalLeaderboard);

export default router;
