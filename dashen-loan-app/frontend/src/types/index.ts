export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  error?: string;
}

export interface LoanSummary {
  maxLoan: number;
  monthlyPayment?: number;
  totalMonths?: number;
  isEligible: boolean;
  [key: string]: any;
}
