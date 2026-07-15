import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { evaluateCollateral } from '../services/collateralValuation';

const prisma = new PrismaClient();

export const evaluateCollateralHandler = async (req: Request, res: Response) => {
  try {
      const result = evaluateCollateral(req.body);
          res.json({ success: true, data: result });
            } catch (error) {
                res.status(400).json({ success: false, error: (error as Error).message });
                  }
                  };

                  export const saveCollateralHandler = async (req: Request, res: Response) => {
                    try {
                        const { loanId, type, estimatedValue, ageYears, location, documentRef } = req.body;
                            const valuation = evaluateCollateral({ type, estimatedValue, ageYears });
                                const collateral = await prisma.collateral.create({
                                      data: {
                                              loanId,
                                                      type,
                                                              estimatedValue,
                                                                      ageYears,
                                                                              discountFactor: valuation.discountFactor / 100,
                                                                                      netValue: valuation.netValue,
                                                                                              location,
                                                                                                      documentRef,
                                                                                                              status: 'ACTIVE',
                                                                                                                    },
                                                                                                                        });
                                                                                                                            res.json({ success: true, data: collateral });
                                                                                                                              } catch (error) {
                                                                                                                                  res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                                    }
                                                                                                                                    };

                                                                                                                                    export const getCollateralByLoanHandler = async (req: Request, res: Response) => {
                                                                                                                                      try {
                                                                                                                                          const { loanId } = req.params;
                                                                                                                                              const collaterals = await prisma.collateral.findMany({ where: { loanId } });
                                                                                                                                                  res.json({ success: true, data: collaterals });
                                                                                                                                                    } catch (error) {
                                                                                                                                                        res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                                                          }
                                                                                                                                                          };