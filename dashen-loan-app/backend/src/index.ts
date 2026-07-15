import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import loanRoutes from './routes/loanRoutes';
import riskRoutes from './routes/riskRoutes';
import collateralRoutes from './routes/collateralRoutes';
import reportRoutes from './routes/reportRoutes';
import authRoutes from './routes/authRoutes';
import customerRoutes from './routes/customerRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
    max: 100,
      standardHeaders: true,
        legacyHeaders: false,
        });
        app.use('/api', limiter);

        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/loans', loanRoutes);
        app.use('/api/risk', riskRoutes);
        app.use('/api/collateral', collateralRoutes);
        app.use('/api/reports', reportRoutes);
        app.use('/api/customers', customerRoutes);

        // Health check
        app.get('/api/health', (req, res) => {
          res.json({ status: 'OK', timestamp: new Date().toISOString() });
          });

          // Error handling
          app.use(errorHandler);

          app.listen(PORT, () => {
            console.log(`🚀 Dashen Loan Backend running on port ${PORT}`);
            });