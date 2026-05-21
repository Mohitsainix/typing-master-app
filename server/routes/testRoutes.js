import express from 'express';
const router = express.Router();
import { saveTestScore, getTestHistory } from '../controllers/testController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, saveTestScore);
router.route('/history').get(protect, getTestHistory);

export default router;
