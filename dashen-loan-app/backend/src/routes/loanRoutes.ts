import { Router } from 'express';
import {
  calculateStaffMortgageHandler,
    calculateRESAHandler,
      calculateConsumerHandler,
        calculateTermHandler,
          calculateODHandler,
            calculatePreShipmentHandler,
              saveLoanHandler,
                getLoansHandler,
                  getLoanByIdHandler,
                  } from '../controllers/loanController';
                  import { authenticate, authorize } from '../middleware/auth';

                  const router = Router();

                  // Calculation endpoints (public with auth)
                  router.post('/staff-mortgage', authenticate, calculateStaffMortgageHandler);
                  router.post('/resa', authenticate, calculateRESAHandler);
                  router.post('/consumer', authenticate, calculateConsumerHandler);
                  router.post('/term', authenticate, calculateTermHandler);
                  router.post('/overdraft', authenticate, calculateODHandler);
                  router.post('/pre-shipment', authenticate, calculatePreShipmentHandler);

                  // CRUD
                  router.post('/', authenticate, authorize('LOAN_OFFICER', 'MANAGER', 'ADMIN'), saveLoanHandler);
                  router.get('/', authenticate, authorize('LOAN_OFFICER', 'MANAGER', 'ADMIN'), getLoansHandler);
                  router.get('/:id', authenticate, getLoanByIdHandler);

                  export default router;