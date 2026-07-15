import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;
          const user = await prisma.user.findUnique({ where: { email } });
              if (!user) {
                    return res.status(401).json({ success: false, error: 'Invalid credentials' });
                        }
                            const valid = await bcrypt.compare(password, user.password);
                                if (!valid) {
                                      return res.status(401).json({ success: false, error: 'Invalid credentials' });
                                          }
                                              const token = jwt.sign(
                                                    { id: user.id, email: user.email, role: user.role },
                                                          process.env.JWT_SECRET!,
                                                                { expiresIn: '24h' }
                                                                    );
                                                                        res.json({
                                                                              success: true,
                                                                                    data: { token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } },
                                                                                        });
                                                                                          } catch (error) {
                                                                                              res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                }
                                                                                                };

                                                                                                export const register = async (req: Request, res: Response) => {
                                                                                                  try {
                                                                                                      const { email, password, fullName, role, branch } = req.body;
                                                                                                          const existing = await prisma.user.findUnique({ where: { email } });
                                                                                                              if (existing) {
                                                                                                                    return res.status(400).json({ success: false, error: 'Email already exists' });
                                                                                                                        }
                                                                                                                            const hashed = await bcrypt.hash(password, 10);
                                                                                                                                const user = await prisma.user.create({
                                                                                                                                      data: { email, password: hashed, fullName, role, branch },
                                                                                                                                          });
                                                                                                                                              res.json({ success: true, data: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
                                                                                                                                                } catch (error) {
                                                                                                                                                    res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                                                      }
                                                                                                                                                      };

                                                                                                                                                      export const me = async (req: Request, res: Response) => {
                                                                                                                                                        try {
                                                                                                                                                            const user = await prisma.user.findUnique({
                                                                                                                                                                  where: { id: (req as any).user.id },
                                                                                                                                                                        select: { id: true, email: true, fullName: true, role: true, branch: true },
                                                                                                                                                                            });
                                                                                                                                                                                res.json({ success: true, data: user });
                                                                                                                                                                                  } catch (error) {
                                                                                                                                                                                      res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                                                                                        }
                                                                                                                                                                                        };