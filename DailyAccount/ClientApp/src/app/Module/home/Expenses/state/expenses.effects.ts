import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { ExpensesService } from "src/app/Services/expenses.service";
import { loadExpenses, loadExpensesSuccess } from "./expenses.action";

@Injectable()
export class ExpensesEffects {
    constructor(private actions$: Actions, private expensesService: ExpensesService) { }

    loadExpenses$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadExpenses),
            mergeMap((action) => {
                return this.expensesService.getAllExpensesWithPagination(action.page ?? 0, action.paginationPageSize ?? 0, action.sort).pipe(
                    map((response) => {
                        return loadExpensesSuccess({ expenses: response.data, lastRow: response.lastRow });
                    }))
            }))
    });
}