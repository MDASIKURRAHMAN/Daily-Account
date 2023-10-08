import { createAction, props } from "@ngrx/store";
import { Expenses } from "src/app/interfaces/IExpenses";

export const LOAD_EXPENSES = '[expenses page] load expenses';
export const LOAD_EXPENSES_SUCCESS = '[expenses page] load expenses success';
export const loadExpenses = createAction(LOAD_EXPENSES,props<{ page?: number; paginationPageSize?:number,sort?: any[] }>());
export const loadExpensesSuccess = createAction(LOAD_EXPENSES_SUCCESS, props<{expenses: Expenses[]; lastRow: number }>());