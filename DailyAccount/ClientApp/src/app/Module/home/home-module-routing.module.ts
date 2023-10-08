import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteGuardService } from 'src/app/Services/route-guard.service';
import { DashboardlistComponent } from './dashboardlist/dashboardlist.component';
import { DepositListComponent } from './Deposits/deposit-list/deposit-list.component';
import { ExpensesListComponent } from './Expenses/expenses-list/expenses-list.component';
import { AddDepositComponent } from './Deposits/add-deposit/add-deposit.component';

const routes: Routes = [
  {
    path:'', canActivateChild: [RouteGuardService], children: [
      {
        path: '', component: DashboardComponent,children:[
          {
            path: '', component: DashboardlistComponent
          },
          {
            path: 'dashboard', component: DashboardlistComponent
          },
          {
            path: 'deposits', component: DepositListComponent
              
            
          },
          {
            path: 'adddeposits', component: AddDepositComponent
          },
          {
            path: 'expenses', component: ExpensesListComponent
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeModuleRoutingModule { }
