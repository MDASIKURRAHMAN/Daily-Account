import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadDashboardElements, setDashboardElements } from "./dashboard.action";
import { map, mergeMap } from "rxjs";
import { DashBoardService } from "src/app/Services/dash-board.service";

@Injectable()
export class dashboardEffects {
    constructor(private actions$: Actions, private dashboardService: DashBoardService) { }
    loadDashboardElements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDashboardElements),
            mergeMap(() =>
                this.dashboardService.getDashBoardElements().pipe(
                    map((response: any) =>
                        setDashboardElements({
                            deposits: response.lastFiveDeposits,
                            expenses: response.lastFiveExpenses,
                            currentBalance: response.currentBalance,
                            lastMonthDeposits: response.totalDepositForLastMonth,
                            lastMonthExpenses: response.totalExpensesForLastMonth,
                        })
                    )
                )
            )
        )
    );
}