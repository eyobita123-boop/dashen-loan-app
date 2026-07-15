import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
      const [totalPortfolio, activeLoans, nplCount, riskDistribution, loanTypeDistribution] = await Promise.all([
            prisma.loan.aggregate({ _sum: { amount: true } }),
                  prisma.loan.count({ where: { status: { in: ['APPROVED', 'DISBURSED'] } } }),
                        prisma.loan.count({ where: { classification: { in: ['SUBSTANDARD', 'DOUBTFUL', 'LOSS'] } } }),
                              prisma.loan.groupBy({ by: ['riskGrade'], _count: true }),
                                    prisma.loan.groupBy({ by: ['loanType'], _sum: { amount: true } }),
                                        ]);

                                            const total = totalPortfolio._sum.amount || 0;
                                                const nplRatio = activeLoans > 0 ? (nplCount / activeLoans) * 100 : 0;
                                                    const topGrades = await prisma.loan.count({ where: { riskGrade: { in: ['A+', 'B+'] } } });
                                                        const topGradesPct = activeLoans > 0 ? (topGrades / activeLoans) * 100 : 0;

                                                            res.json({
                                                                  success: true,
                                                                        data: {
                                                                                totalPortfolio: total,
                                                                                        activeLoans,
                                                                                                nplRatio: Math.round(nplRatio * 100) / 100,
                                                                                                        topGradesPct: Math.round(topGradesPct * 100) / 100,
                                                                                                                riskDistribution: riskDistribution.map(r => ({ grade: r.riskGrade, count: r._count })),
                                                                                                                        loanTypeDistribution: loanTypeDistribution.map(l => ({ type: l.loanType, amount: l._sum.amount })),
                                                                                                                              },
                                                                                                                                  });
                                                                                                                                    } catch (error) {
                                                                                                                                        res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                                          }
                                                                                                                                          };

                                                                                                                                          export const getNPLTrend = async (req: Request, res: Response) => {
                                                                                                                                            try {
                                                                                                                                                // Simulated trend - in production, group by month
                                                                                                                                                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                                                                                                                                        const trend = months.map((month, i) => ({
                                                                                                                                                              month,
                                                                                                                                                                    nplRate: Math.round((1 + Math.sin(i / 2)) * 5 + 2 + i * 0.3), // simulated
                                                                                                                                                                        }));
                                                                                                                                                                            res.json({ success: true, data: trend });
                                                                                                                                                                              } catch (error) {
                                                                                                                                                                                  res.status(400).json({ success: false, error: (error as Error).message });
                                                                                                                                                                                    }
                                                                                                                                                                                    };