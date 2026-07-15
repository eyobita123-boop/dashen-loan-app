import { RiskParameters, RiskGrade } from '../types';

export function calculateRiskRating(params: RiskParameters): RiskGrade {
  const fp = Object.values(params.financialPosition).reduce((a, b) => a + b, 0);
    const perf = Object.values(params.financialPerformance).reduce((a, b) => a + b, 0);
      const cf = Object.values(params.cashFlow).reduce((a, b) => a + b, 0);
        const cp = Object.values(params.creditProfile).reduce((a, b) => a + b, 0);
          const br = Object.values(params.businessRisk).reduce((a, b) => a + b, 0);
            const om = Object.values(params.organizationManagement).reduce((a, b) => a + b, 0);
              const col = Object.values(params.collateralPosition).reduce((a, b) => a + b, 0);

                const totalScore = fp + perf + cf + cp + br + om + col;

                  let grade: RiskGrade['grade'] = 'E';
                    let level = '';
                      let response = '';
                        let maxLoanToCollateral = 0;

                          if (totalScore >= 85) {
                              grade = 'A+'; level = 'Exceptionally Low Risk'; response = 'Bankable – preferred'; maxLoanToCollateral = 1.5;
                                } else if (totalScore >= 70) {
                                    grade = 'B+'; level = 'Very Low Risk'; response = 'Bankable – preferred'; maxLoanToCollateral = 1.4;
                                      } else if (totalScore >= 60) {
                                          grade = 'B'; level = 'Low Risk'; response = 'Bankable'; maxLoanToCollateral = 1.3;
                                            } else if (totalScore >= 50) {
                                                grade = 'C+'; level = 'Very Moderate Risk'; response = 'Bankable'; maxLoanToCollateral = 1.0;
                                                  } else if (totalScore >= 40) {
                                                      grade = 'C'; level = 'Moderate Risk'; response = 'Bankable with adequate collateral'; maxLoanToCollateral = 1.0;
                                                        } else if (totalScore >= 20) {
                                                            grade = 'C-'; level = 'Potential Risk'; response = 'Bankable with adequate collateral (25%+ margin)'; maxLoanToCollateral = 0.75;
                                                              } else if (totalScore >= 10) {
                                                                  grade = 'D'; level = 'High Risk'; response = 'Exceptionally Bankable – Deferred'; maxLoanToCollateral = 0.5;
                                                                    } else {
                                                                        grade = 'E'; level = 'Very High Risk'; response = 'Declined'; maxLoanToCollateral = 0;
                                                                          }

                                                                            return { score: totalScore, grade, level, response, maxLoanToCollateral };
                                                                            }