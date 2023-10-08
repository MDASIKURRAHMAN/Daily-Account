import { createAction, props } from '@ngrx/store';

export const loadDashboardElements = createAction('[Dashboard] Load Elements');
export const setDashboardElements = createAction(
  '[Dashboard] Set Elements',
  props<{ deposits: any[]; expenses: any[]; currentBalance: number; lastMonthDeposits: number; lastMonthExpenses: number }>()
);
