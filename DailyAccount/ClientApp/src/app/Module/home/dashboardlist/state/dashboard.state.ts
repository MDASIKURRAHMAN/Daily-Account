export interface dashboardState {
    deposits: any[];
    expenses: any[];
    currentBalance: number;
    lastMonthDeposits: number;
    lastMonthExpenses: number;
  }
  export const initialState: dashboardState = {
    deposits: [],
    expenses: [],
    currentBalance: 0,
    lastMonthDeposits: 0,
    lastMonthExpenses: 0,
  };