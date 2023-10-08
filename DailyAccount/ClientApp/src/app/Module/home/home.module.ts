import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeModuleRoutingModule } from './home-module-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { DashboardlistComponent } from './dashboardlist/dashboardlist.component';
import { DepositListComponent } from './Deposits/deposit-list/deposit-list.component';
import { ExpensesListComponent } from './Expenses/expenses-list/expenses-list.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { DepositsEffects } from './Deposits/state/deposits.effects';
import { AgGridModule } from 'ag-grid-angular';
import { CellRendererComponent } from './Deposits/cell-renderer/cell-renderer.component';
import { ExpensesCellRendererComponent } from './Expenses/expenses-cell-renderer/expenses-cell-renderer.component';
import { AddDepositComponent } from './Deposits/add-deposit/add-deposit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateDepositComponent } from './Deposits/update-deposit/update-deposit.component';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { AddExpensesComponent } from './Expenses/add-expenses/add-expenses.component';
import { UpdateExpensesComponent } from './Expenses/update-expenses/update-expenses.component';
import { DeleteDialogComponent } from './CustomComponent/delete-dialog/delete-dialog.component';
import { dashboardEffects } from './dashboardlist/state/dashboard.effects';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisPipe } from './Pipe/ellipsis.pipe';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ExpensesEffects } from './Expenses/state/expenses.effects';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
ModuleRegistry.registerModules([ServerSideRowModelModule]);

@NgModule({
  declarations: [
    DashboardComponent,
    NavBarComponent,
    DashboardlistComponent,
    DepositListComponent,
    ExpensesListComponent,
    CellRendererComponent,
    ExpensesCellRendererComponent,
    AddDepositComponent,
    UpdateDepositComponent,
    AddExpensesComponent,
    UpdateExpensesComponent,
    EllipsisPipe,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    HomeModuleRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSnackBarModule,
    StoreModule.forRoot(appReducer),
    AgGridModule,
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    EffectsModule.forRoot([DepositsEffects,dashboardEffects,ExpensesEffects])
  ]
})
export class HomeModule { }
