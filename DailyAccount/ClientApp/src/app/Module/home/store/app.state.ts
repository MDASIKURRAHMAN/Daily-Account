import { depositsReducer } from "../Deposits/state/deposits.reducer";
import { DepositsState } from "../Deposits/state/deposits.state";
import { expensesReducer } from "../Expenses/state/expenses.reducer";
import { ExpensesState } from "../Expenses/state/expenses.state";
import { dashboardReducer } from "../dashboardlist/state/dashboard.reducer";
import { dashboardState } from "../dashboardlist/state/dashboard.state";

export interface AppState{
    deposits : DepositsState;
    expenses : ExpensesState;
    dasboardElements : dashboardState;
}

export const appReducer = {
    deposits: depositsReducer,
    expenses: expensesReducer,
    dasboardElements: dashboardReducer
}