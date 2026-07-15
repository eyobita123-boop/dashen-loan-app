import axios from 'axios';

// ============================================================
// 🎯 MOCK DATA GENERATOR – All API responses
// ============================================================
function getMockResponse(url: string, data: any) {
  // ----- STAFF MORTGAGE -----
  if (url.includes('/loans/staff-mortgage')) {
    return {
      success: true,
      data: {
        maxLoan: 4282000,
        maxPropertyPrice: 5352500,
        maxMonthlyPayment: 27544,
        totalMonths: 300,
        isEligible: true,
        tenureUsed: 25,
      },
    };
  }

  // ----- STAFF AUTO -----
  if (url.includes('/loans/auto')) {
    return {
      success: true,
      data: {
        maxLoan: 350000,
        requiredEquity: 50000,
        maxMonthlyPayment: 7500,
        totalMonths: 120,
        isEligible: true,
      },
    };
  }

  // ----- RESA -----
  if (url.includes('/loans/resa')) {
    return {
      success: true,
      data: {
        limit: 120000,
        months: 36,
        interest: 0,
        collateral: 'None (Interest Free)',
      },
    };
  }

  // ----- CONSUMER LOAN -----
  if (url.includes('/loans/consumer')) {
    return {
      success: true,
      data: {
        maxLoan: 850000,
        maxLoanByIncome: 900000,
        maxLoanByCollateral: 850000,
        collateralMargin: 85,
        totalMonths: 300,
        isEligible: true,
      },
    };
  }

  // ----- TERM LOAN -----
  if (url.includes('/loans/term')) {
    return {
      success: true,
      data: {
        bankContribution: 70,
        requiredEquity: 300000,
        monthlyPayment: 18300,
        totalMonths: 240,
      },
    };
  }

  // ----- OVERDRAFT -----
  if (url.includes('/loans/overdraft')) {
    return {
      success: true,
      data: {
        turnoverRatio: 3.5,
        minDebitBalancePct: 2.1,
        turnoverRating: 'Very Good',
        balanceRating: 'Unsatisfactory',
        isRenewable: true,
      },
    };
  }

  // ----- PRE-SHIPMENT -----
  if (url.includes('/loans/pre-shipment')) {
    return {
      success: true,
      data: {
        maxAdvance: 500000,
        margin: 85,
        exportPerformanceRatio: 1.6,
        renewalStatus: '15% Limit Reduction',
        isEligible: true,
      },
    };
  }

  // ----- RISK ASSESSMENT -----
  if (url.includes('/risk/assess')) {
    return {
      success: true,
      data: {
        score: 72,
        grade: 'B+',
        level: 'Very Low Risk',
        response: 'Bankable – preferred',
        maxLoanToCollateral: 1.4,
      },
    };
  }

  // ----- LOAN CLASSIFICATION -----
  if (url.includes('/risk/classify')) {
    return {
      success: true,
      data: {
        classification: 'PASS',
        provisioningPct: 0.01,
        isNonPerforming: false,
        display: 'Pass',
      },
    };
  }

  // ----- COLLATERAL VALUATION -----
  if (url.includes('/collateral/evaluate')) {
    return {
      success: true,
      data: {
        discountFactor: 85,
        netValue: 850000,
        acceptableBase: 'Engineering Estimation',
      },
    };
  }

  // ----- DASHBOARD -----
  if (url.includes('/reports/dashboard')) {
    return {
      success: true,
      data: {
        totalPortfolio: 45200000,
        activeLoans: 87,
        nplRatio: 2.4,
        topGradesPct: 68,
        riskDistribution: [
          { grade: 'A+', count: 12 },
          { grade: 'B+', count: 24 },
          { grade: 'B', count: 31 },
          { grade: 'C+', count: 14 },
          { grade: 'C', count: 6 },
        ],
        loanTypeDistribution: [
          { type: 'STAFF_MORTGAGE', amount: 12000000 },
          { type: 'STAFF_AUTO', amount: 4500000 },
          { type: 'CONSUMER', amount: 8700000 },
          { type: 'TERM', amount: 20000000 },
        ],
      },
    };
  }

  // ----- NPL TREND -----
  if (url.includes('/reports/npl-trend')) {
    return {
      success: true,
      data: [
        { month: 'Jan', nplRate: 2.1 },
        { month: 'Feb', nplRate: 2.3 },
        { month: 'Mar', nplRate: 2.0 },
        { month: 'Apr', nplRate: 2.8 },
        { month: 'May', nplRate: 3.1 },
        { month: 'Jun', nplRate: 2.7 },
        { month: 'Jul', nplRate: 2.4 },
        { month: 'Aug', nplRate: 2.2 },
        { month: 'Sep', nplRate: 1.9 },
        { month: 'Oct', nplRate: 1.8 },
        { month: 'Nov', nplRate: 2.0 },
        { month: 'Dec', nplRate: 2.6 },
      ],
    };
  }

  // ----- CUSTOMERS -----
  if (url.includes('/customers')) {
    return {
      success: true,
      data: [
        {
          id: '1',
          fullName: 'ABC Trading PLC',
          tin: '123456789',
          phone: '0912345678',
          email: 'abc@example.com',
          address: 'Addis Ababa',
          businessType: 'PLC',
          yearsInOperation: 5,
        },
        {
          id: '2',
          fullName: 'XYZ Construction',
          tin: '987654321',
          phone: '0987654321',
          email: 'xyz@example.com',
          address: 'Addis Ababa',
          businessType: 'SOLE_PROPRIETOR',
          yearsInOperation: 3,
        },
      ],
    };
  }

  // ----- LOGIN -----
  if (url.includes('/auth/login')) {
    return {
      success: true,
      data: {
        token: 'fake-jwt-token',
        user: {
          id: '1',
          email: 'admin@dashen.com',
          fullName: 'Admin User',
          role: 'ADMIN',
        },
      },
    };
  }

  // ----- REGISTER -----
  if (url.includes('/auth/register')) {
    return {
      success: true,
      data: {
        id: '1',
        email: 'admin@dashen.com',
        fullName: 'Admin User',
        role: 'ADMIN',
      },
    };
  }

  // ----- GET ME -----
  if (url.includes('/auth/me')) {
    return {
      success: true,
      data: {
        id: '1',
        email: 'admin@dashen.com',
        fullName: 'Admin User',
        role: 'ADMIN',
      },
    };
  }

  // ----- DEFAULT -----
  return { success: true, data: { message: 'Mock response' } };
}

// ============================================================
// 📦 AXIOS INSTANCE WITH MOCK INTERCEPTOR
// ============================================================
const api = axios.create({
  baseURL: 'https://dashen-loan-app-production.up.railway.app/api',
  headers: { 'Content-Type': 'application/json' },
});

// Intercept all requests – return mock data instead of making real network calls
api.interceptors.request.use((config) => {
  const mockData = getMockResponse(config.url || '', config.data);
  // Return a resolved promise with mock data
  config.adapter = () => {
    return Promise.resolve({
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    });
  };
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
