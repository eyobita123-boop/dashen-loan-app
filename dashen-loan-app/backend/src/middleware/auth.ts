import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
}

// ============================================================
// ⚠️  TESTING BYPASS – Remove this block for production
// ============================================================
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Bypass authentication entirely – always set a default admin user
  req.user = {
    id: '1',
    email: 'admin@dashen.com',
    role: 'ADMIN',
  };
  next();
};
// ============================================================
// End of bypass – uncomment the code below to restore real auth
// ============================================================

// ORIGINAL AUTH (commented out – uncomment for production)
/*
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized - No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Unauthorized - Invalid token' });
  }
};
*/

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Forbidden - Insufficient role' });
    }
    next();
  };
};
