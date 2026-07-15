import { Router } from 'express';
import {
  assessRiskHandler,
    classifyLoanHandler,
      saveRiskAssessmentHandler,
      } from '../controllers/riskController';
      import { authenticate } from '../middleware/auth';

      const router = Router();

      router.post('/assess', authenticate, assessRiskHandler);
      router.post('/classify', authenticate, classifyLoanHandler);
      router.post('/save', authenticate, saveRiskAssessmentHandler);

      export default router;