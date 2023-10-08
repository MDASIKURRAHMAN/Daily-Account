import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DepositsState } from "./deposits.state";

const getDepositsState = createFeatureSelector<DepositsState>('deposits');

export const getDeposits = createSelector(
  getDepositsState,
  (state: DepositsState) => state.deposits
);

export const getLastRow = createSelector(
  getDepositsState,
  (state: DepositsState) => state.lastRow
);

export const getDepositsWithLastRow = createSelector(
  getDeposits,
  getLastRow,
  (deposits, lastRow) => ({ deposits, lastRow })
);
