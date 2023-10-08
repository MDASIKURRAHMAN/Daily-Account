import { createAction, props } from "@ngrx/store";
import { Deposit } from "src/app/interfaces/IDeposit";

export const LOAD_DEPOSITS = '[depsits page] load deposits';
export const LOAD_DEPOSITS_SUCCESS = '[deposits page] load deposits success';

export const loadDeposits = createAction(LOAD_DEPOSITS,props<{ page?: number; paginationPageSize?:number,sort?: any[] }>());
export const loadDepositsSuccess = createAction(LOAD_DEPOSITS_SUCCESS, props<{deposits: Deposit[]; lastRow: number }>());