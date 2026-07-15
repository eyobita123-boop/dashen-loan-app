import { Router } from 'express';
import { getDashboardSummary, getNPLTrend } from '../controllers/reportController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/dashboard', authenticate, getDashboardSummary);
router.get('/npl-trend', authenticate, getNPLTrend);

export default router;