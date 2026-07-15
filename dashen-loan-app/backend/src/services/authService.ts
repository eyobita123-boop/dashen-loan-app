import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => bcrypt.hash(password, 10);

export const comparePassword = async (password: string, hash: string) => bcrypt.compare(password, hash);

export const createAuthToken = (payload: object) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};
