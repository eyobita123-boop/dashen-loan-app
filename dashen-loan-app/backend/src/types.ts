export interface StaffMortgageInput {
  basicSalary: number;
  spouseIncome?: number;
  loanAmountRequested: number;
  tenureYears: number;
  interestRate: number;
  equityPct: number;
  employeeAge: number;
  retirementAge: number;
  hasSpouse: boolean;
  isScaledUp: boolean;
  serviceYears: number;
  positionLevel: 'Director' | 'Middle' | 'Line' | 'Professional';
}

export interface StaffMortgageOutput {
  maxLoan: number;
  maxPropertyPrice: number;
  maxMonthlyPayment: number;
  totalMonths: number;
  isEligible: boolean;
  tenureUsed: number;
}

export interface RiskParameters {
  financialPosition: {
    currentRatio: number;
    quickRatio: number;
    totalLiabilityToAsset: number;
    debtServiceCoverage: number;
    interestCoverage: number;
    qualityOfFinancials: number;
  };
  financialPerformance: {
    grossProfitMargin: number;
    operatingProfitMargin: number;
    netProfitMargin: number;
    returnOnAsset: number;
    returnOnEquity: number;
    arTurnover: number;
    inventoryTurnover: number;
  };
  cashFlow: {
    operatingCashFlowRatio: number;
    salesViaDashenBank: number;
  };
  creditProfile: {
    currentCreditRelationship: number;
    borrowingHistory: number;
    rescheduledLoans: number;
    currentStatus: number;
    totalCreditExposure: number;
    odTurnover: number;
    merchandiseTurnover: number;
    preshipmentSettlement: number;
    settlementRecords: number;
    totalSettledLoans: number;
  };
  businessRisk: {
    sectorDiversification: number;
    ageOfBusiness: number;
    industryOutlook: number;
    marketCompetition: number;
    esgCompliance: number;
    politicalRisk: number;
  };
  organizationManagement: {
    formOfOrganization: number;
    managementEngagement: number;
    managementExperience: number;
    managementQualification: number;
  };
  collateralPosition: {
    typeScore: number;
    safetyMargin: number;
  };
}

export interface RiskGrade {
  score: number;
  grade: 'A+' | 'B+' | 'B' | 'C+' | 'C' | 'C-' | 'D' | 'E';
  level: string;
  response: string;
  maxLoanToCollateral: number;
}
