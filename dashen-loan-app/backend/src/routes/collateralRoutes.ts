import { Router } from 'express';
import {
  evaluateCollateralHandler,
    saveCollateralHandler,
      getCollateralByLoanHandler,
      } from '../controllers/collateralController';
      import { authenticate } from '../middleware/auth';

      const router = Router();

      router.post('/evaluate', authenticate, evaluateCollateralHandler);
      router.post('/', authenticate, saveCollateralHandler);
      router.get('/loan/:loanId', authenticate, getCollateralByLoanHandler);

      export default router;