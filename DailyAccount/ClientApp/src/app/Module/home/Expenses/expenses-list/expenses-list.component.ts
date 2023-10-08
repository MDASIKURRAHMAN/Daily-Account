import { Component, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DateTime } from 'luxon';
import { Expenses } from 'src/app/interfaces/IExpenses';
import { AppState } from '../../store/app.state';
import { ExpensesService } from 'src/app/Services/expenses.service';
import { AddExpensesComponent } from '../add-expenses/add-expenses.component';
import { UpdateExpensesComponent } from '../update-expenses/update-expenses.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { getExpensesWithLastRow } from '../state/expenses.selector';
import { loadExpenses } from '../state/expenses.action';
import { DeleteDialogComponent } from '../../CustomComponent/delete-dialog/delete-dialog.component';
import { MessageShowService } from 'src/app/Services/message-show.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent {
  public paginationPageSize = 5;
  currentPage: number = 1;
  totalItems: number = 0;
  dataSource: Expenses[] = [];
  colId: string = 'date'
  sortDirection: string = 'desc'
  displayedColumns: string[] = ['date', 'amount', 'description', 'actions'];
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(private store: Store<AppState>, private dialog: MatDialog, private expensesService: ExpensesService, private messageService: MessageShowService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    const sort = [{ colId: this.colId, sort: this.sortDirection }];

    this.store.dispatch(loadExpenses({ page: this.currentPage, paginationPageSize: this.paginationPageSize, sort }));
    this.store.pipe(select(getExpensesWithLastRow)).subscribe(({ expenses, lastRow }) => {

      this.dataSource = expenses;
      this.totalItems = lastRow ?? + 1;
    });

  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.paginationPageSize = event.pageSize;
    this.loadExpenses();
  }
  onSortChange(sort: Sort) {
    this.colId = sort.active;
    const sortOrder = sort.direction;
    this.sortDirection = sortOrder === 'desc' ? 'desc' : 'asc';
    this.loadExpenses();
  }
  formatDate(date: any): string {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT);
  }
  formatAmount(amount: any) {
    const numberValue = typeof amount === 'number' ? amount : Number(amount);
    const formattedAmount = isNaN(numberValue)
      ? ''
      : numberValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
    return formattedAmount;
  }
  createExpenses() {
    const dialogRef = this.dialog.open(AddExpensesComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadExpenses();
        this.messageService.showSnackBar('Expenses Added successfully.', 'success-snackbar');
      } else if (result === '') {
        this.messageService.showSnackBar('You have closed dialog without added', 'error-snackbar');
      }
      else if (result === 'unsuccess') {
        this.messageService.showSnackBar('Sorry Something Went Wrong! Expenses is not added', 'error-snackbar')
      }
    });
  }

  editExpenses(expenses: Expenses) {
    const dialogRef = this.dialog.open(UpdateExpensesComponent, {
      width: '400px',
    });
    dialogRef.componentInstance.setData(expenses);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadExpenses();
        this.messageService.showSnackBar(' Expenses Updated successfully.', 'success-snackbar');
      } else if (result === '') {
        this.messageService.showSnackBar('You have closed dialog without Updated', 'error-snackbar');
      }
      else if (result === 'unsuccess') {
        this.messageService.showSnackBar('Sorry Something Went Wrong! Expenses is not Updated', 'error-snackbar')
      }
    });
  }

  deleteExpenses(expenses: Expenses) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this item?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.expensesService.deleteExpenses(expenses.expenseID).subscribe(response => {
          this.loadExpenses();
          this.messageService.showSnackBar(' Expenses deleted successfully.', 'success-snackbar');

        });
      }
    });
  }
}
