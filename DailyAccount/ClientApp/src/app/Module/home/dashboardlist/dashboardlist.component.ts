import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, map } from 'rxjs';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { loadDashboardElements } from './state/dashboard.action';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-dashboardlist',
  templateUrl: './dashboardlist.component.html',
  styleUrls: ['./dashboardlist.component.css']
})
export class DashboardlistComponent implements OnInit, AfterViewInit {
  deposits$!: Observable<any[]>;
  expenses$!: Observable<any[]>;
  currentBalance$!: Observable<string>;
  lastMonthDeposits$!: Observable<string>;
  lastMonthExpenses$!: Observable<string>;
  depositColumnDefs = ['date', 'amount', 'description'];
  expenseColumnDefs = ['date', 'amount', 'description'];
  depositDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  expenseDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild('expenseSort', { static: false }) 
  expenseSort!: MatSort;

  constructor(private store: Store<AppState>, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit() {
    this.store.dispatch(loadDashboardElements());
    this.deposits$ = this.store.select(state => state.dasboardElements.deposits);
    this.expenses$ = this.store.select(state => state.dasboardElements.expenses);
    this.currentBalance$ = this.store.select(state => state.dasboardElements.currentBalance)
      .pipe(map(value => this.formatAmount(value)));
    this.lastMonthDeposits$ = this.store.select(state => state.dasboardElements.lastMonthDeposits)
      .pipe(map(value => this.formatAmount(value)));
    this.lastMonthExpenses$ = this.store.select(state => state.dasboardElements.lastMonthExpenses)
      .pipe(map(value => this.formatAmount(value)));
    this.deposits$.subscribe(data => this.depositDataSource.data = data);
    this.expenses$.subscribe(data => this.expenseDataSource.data = data);
  }
  ngAfterViewInit() {

    this.depositDataSource.sort = this.sort;
    this.expenseDataSource.sort = this.expenseSort;

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  formatDate(params: any) {
    const formattedDate = DateTime.fromISO(params).toLocaleString(DateTime.DATE_SHORT);
    return formattedDate;
  }

  formatAmount(params: any) {
    const value = typeof params === 'number' ? params : params.value;
    const numberValue = typeof value === 'number' ? value : Number(value);
    const formattedAmount = isNaN(numberValue)
      ? ''
      : numberValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    return formattedAmount;
  }
  onCardHover(isHovering: boolean): void {

  }
}

