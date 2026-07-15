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
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// 👇 THIS LINE FIXES THE ERROR
app.set('trust proxy', 1);

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

// ---- Create default admin user if none exists ----
async function seedDefaultUser() {
  try {
    const existing = await prisma.user.findUnique({
      where: { email: 'admin@dashen.com' }
    });
    if (!existing) {
      const hashed = await bcrypt.hash('password123', 10);
      await prisma.user.create({
        data: {
          email: 'admin@dashen.com',
          password: hashed,
          fullName: 'Admin User',
          role: 'ADMIN',
        }
      });
      console.log('✅ Default admin user created.');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }
  } catch (err) {
    console.error('Error seeding default user:', err);
  }
}

// ---- Start server after seeding ----
seedDefaultUser().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Dashen Loan Backend running on port ${PORT}`);
  });
});
