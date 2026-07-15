import { Router } from 'express';
import { createCustomer, getCustomers, getCustomerById } from '../controllers/customerController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, authorize('LOAN_OFFICER', 'MANAGER', 'ADMIN'), createCustomer);
router.get('/', authenticate, authorize('LOAN_OFFICER', 'MANAGER', 'ADMIN'), getCustomers);
router.get('/:id', authenticate, authorize('LOAN_OFFICER', 'MANAGER', 'ADMIN'), getCustomerById);

export default router;
