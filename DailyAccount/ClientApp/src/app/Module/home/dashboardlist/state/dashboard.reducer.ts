import { createReducer, on } from "@ngrx/store";
import { initialState } from "./dashboard.state";
import { setDashboardElements } from "./dashboard.action";

export const dashboardReducer = createReducer(
    initialState,
    on(setDashboardElements, (state:any, { deposits, expenses, currentBalance, lastMonthDeposits, lastMonthExpenses }) => ({   
      ...state,
      deposits,
      expenses,
      currentBalance,
      lastMonthDeposits,
      lastMonthExpenses,
    }))
  );