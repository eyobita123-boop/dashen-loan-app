import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  calculateStaffMortgage,
    calculateRESA,
      calculateConsumerLoan,
        calculateTermLoan,
          calculateOverdraft,
            calculatePreShipment,
            } from '../services/loanCalculations';

            const prisma = new PrismaClient();

            export const calculateStaffMortgageHandler = async (req: Request, res: Response) => {
              try {
                  const result = calculateStaffMortgage(req.body);
                      res.json({ success: true, data: result });
                        } catch (error) {
                            res.status(400).json({ success: false, error: (error as Error).message });
                              }
                              };

                              export const calculateRESAHandler = async (req: Request, res: Response) => {
                                try {
                                    const { basicSalary, serviceYears, employeeAge, retirementAge } = req.body;
                                        const result = calculateRESA(basicSalary, serviceYears, employeeAge, retirementAge);
                                            res.json({ success: true, data: result });
                                              } catch (error) {
                                                  res.status(400).json({ success: false, error: (error as Error).message });
                                                    }
                                                    };

                                                    export const calculateConsumerHandler = async (req: Request, res: Response) => {
                                                      try {
                                                          const result = calculateConsumerLoan(req.body);
                                                              res.json({ success: true, data: result });
                                                                } catch (error) {
                                                                    res.status(400).json({ success: false, error: (error as Error).message });
                                                                      }
                                                                      };

                                                                      export const calculateTermHandler = async (req: Request, res: Response) => {
                                                                        try {
                                                                            const result = calculateTermLoan(req.body);
                                                                                res.json({ success: true, data: result });
                                                                                  } catch (error) {
                                                                                      res.status(400).json({ success: false, error: (error as Error).message });
                                                                                        }
                                                                                        };

                                                                                        export const calculateODHandler = async (req: Request, res: Response) => {
                                                                                          try {
                                                                                              const result = calculateOverdraft(req.body);
                                                                                                  res.json({ success: true, data: result });
                                                                                                    } catch (error) {
                                                                                                        res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                          }
                                                                                                          };

                                                                                                          export const calculatePreShipmentHandler = async (req: Request, res: Response) => {
                                                                                                            try {
                                                                                                                const result = calculatePreShipment(req.body);
                                                                                                                    res.json({ success: true, data: result });
                                                                                                                      } catch (error) {
                                                                                                                          res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                            }
                                                                                                                            };

                                                                                                                            export const saveLoanHandler = async (req: Request, res: Response) => {
                                                                                                                              try {
                                                                                                                                  const { customerId, loanType, amount, interestRate, tenureMonths, monthlyPayment, collateralValue, collateralType, userId } = req.body;
                                                                                                                                      const loan = await prisma.loan.create({
                                                                                                                                            data: {
                                                                                                                                                    customerId,
                                                                                                                                                            loanType,
                                                                                                                                                                    amount,
                                                                                                                                                                            interestRate,
                                                                                                                                                                                    tenureMonths,
                                                                                                                                                                                            monthlyPayment,
                                                                                                                                                                                                    collateralValue,
                                                                                                                                                                                                            collateralType,
                                                                                                                                                                                                                    userId,
                                                                                                                                                                                                                            status: 'PENDING',
                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                          res.json({ success: true, data: loan });
                                                                                                                                                                                                                                            } catch (error) {
                                                                                                                                                                                                                                                res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                  };

                                                                                                                                                                                                                                                  export const getLoansHandler = async (req: Request, res: Response) => {
                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                        const loans = await prisma.loan.findMany({
                                                                                                                                                                                                                                                              include: { customer: true, user: { select: { fullName: true } } },
                                                                                                                                                                                                                                                                    orderBy: { createdAt: 'desc' },
                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                            res.json({ success: true, data: loans });
                                                                                                                                                                                                                                                                              } catch (error) {
                                                                                                                                                                                                                                                                                  res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                                    export const getLoanByIdHandler = async (req: Request, res: Response) => {
                                                                                                                                                                                                                                                                                      try {
                                                                                                                                                                                                                                                                                          const { id } = req.params;
                                                                                                                                                                                                                                                                                              const loan = await prisma.loan.findUnique({
                                                                                                                                                                                                                                                                                                    where: { id },
                                                                                                                                                                                                                                                                                                          include: { customer: true, repayments: true, collateral: true, riskAssessment: true },
                                                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                                                                  if (!loan) {
                                                                                                                                                                                                                                                                                                                        return res.status(404).json({ success: false, error: 'Loan not found' });
                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                res.json({ success: true, data: loan });
                                                                                                                                                                                                                                                                                                                                  } catch (error) {
                                                                                                                                                                                                                                                                                                                                      res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                        };