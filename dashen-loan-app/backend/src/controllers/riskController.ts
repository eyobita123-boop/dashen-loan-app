import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { calculateRiskRating } from '../services/riskRating';
import { classifyLoan } from '../services/classification';

const prisma = new PrismaClient();

export const assessRiskHandler = async (req: Request, res: Response) => {
  try {
      const params = req.body;
          const result = calculateRiskRating(params);
              res.json({ success: true, data: result });
                } catch (error) {
                    res.status(400).json({ success: false, error: (error as Error).message });
                      }
                      };

                      export const classifyLoanHandler = async (req: Request, res: Response) => {
                        try {
                            const result = classifyLoan(req.body);
                                res.json({ success: true, data: result });
                                  } catch (error) {
                                      res.status(400).json({ success: false, error: (error as Error).message });
                                        }
                                        };

                                        export const saveRiskAssessmentHandler = async (req: Request, res: Response) => {
                                          try {
                                              const { loanId, userId, parameters } = req.body;
                                                  const riskResult = calculateRiskRating(parameters);
                                                      const assessment = await prisma.riskAssessment.create({
                                                            data: {
                                                                    loanId,
                                                                            userId,
                                                                                    score: riskResult.score,
                                                                                            grade: riskResult.grade,
                                                                                                    level: riskResult.level,
                                                                                                            response: riskResult.response,
                                                                                                                    maxLoanToCollateral: riskResult.maxLoanToCollateral,
                                                                                                                            parameters,
                                                                                                                                  },
                                                                                                                                      });
                                                                                                                                          // Update loan with risk grade
                                                                                                                                              await prisma.loan.update({
                                                                                                                                                    where: { id: loanId },
                                                                                                                                                          data: { riskGrade: riskResult.grade },
                                                                                                                                                              });
                                                                                                                                                                  res.json({ success: true, data: assessment });
                                                                                                                                                                    } catch (error) {
                                                                                                                                                                        res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                                                                          }
                                                                                                                                                                          };