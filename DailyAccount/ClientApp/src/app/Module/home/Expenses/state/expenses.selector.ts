import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExpensesState } from "./expenses.state";

const getExpensesState = createFeatureSelector<ExpensesState>('expenses');

export const getExpenses = createSelector(
    getExpensesState,
    (state: ExpensesState) => state.expenses
);

export const getLastRow = createSelector(
    getExpensesState,
    (state: ExpensesState) => state.lastRow
);

export const getExpensesWithLastRow = createSelector(
    getExpenses,
    getLastRow,
    (expenses, lastRow) => ({ expenses, lastRow })
);
