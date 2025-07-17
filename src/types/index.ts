export interface Transaction {
  account_id: string;
  transaction_date: string;
  transaction_category: string;
  transaction_amount: number;
  transaction_description: string;
}

export interface CategorySummary {
  name: string;
  value: number; // percentage
  amount: number;
  emoji: string;
}

export interface MonthlySpending {
  day: string;
  amount: number;
}

export interface SpendingTrends {
  month: string;
  amount: number;
}

export interface ChartData {
  name: string;
  value: number;
}