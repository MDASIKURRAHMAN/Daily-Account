import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DepositsService } from "src/app/Services/deposits.service";
import { loadDeposits, loadDepositsSuccess } from "./deposits.action";
import { map, mergeMap } from "rxjs/operators";

@Injectable()
export class DepositsEffects {
    constructor(private actions$: Actions, private depositsService: DepositsService) { }

    loadDeposits$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadDeposits),
            mergeMap((action) => {
                return this.depositsService.getAllDepositsWithPagination(action.page ?? 0, action.paginationPageSize ?? 0, action.sort).pipe(
                    map((response) => {
                        return loadDepositsSuccess({ deposits: response.data, lastRow: response.lastRow });
                    }))
            }))
    });
}