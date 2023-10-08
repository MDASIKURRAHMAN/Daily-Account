import { Component, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable, of } from 'rxjs';
import { Deposit } from 'src/app/interfaces/IDeposit';
import { getDepositsWithLastRow } from '../state/deposits.selector';
import { loadDeposits } from '../state/deposits.action';
import { ColDef, IGetRowsParams, IServerSideGetRowsRequest, RowModelType } from 'ag-grid-community';
import { DepositsService } from 'src/app/Services/deposits.service';
import { CellRendererComponent } from '../cell-renderer/cell-renderer.component';
import { DateTime } from 'luxon';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDepositComponent } from '../add-deposit/add-deposit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IServerSideGetRowsParams } from '@ag-grid-community/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { UpdateDepositComponent } from '../update-deposit/update-deposit.component';
import { DeleteDialogComponent } from '../../CustomComponent/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageShowService } from 'src/app/Services/message-show.service';

@Component({
  selector: 'app-deposit-list',
  templateUrl: './deposit-list.component.html',
  styleUrls: ['./deposit-list.component.css']
})
export class DepositListComponent {
  public paginationPageSize = 5;
  currentPage: number = 1;
  totalItems: number = 0;
  dataSource: Deposit[] = [];
  colId: string = 'date'
  sortDirection: string = 'desc'
  displayedColumns: string[] = ['date', 'amount', 'description', 'actions'];
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(private store: Store<AppState>, private dialog: MatDialog, private depositService: DepositsService, private messageService: MessageShowService) { }

  ngOnInit(): void {
    this.loadDeposits();
  }

  loadDeposits() {
    const sort = [{ colId: this.colId, sort: this.sortDirection }];

    this.store.dispatch(loadDeposits({ page: this.currentPage, paginationPageSize: this.paginationPageSize, sort }));
    this.store.pipe(select(getDepositsWithLastRow)).subscribe(({ deposits, lastRow }) => {

      this.dataSource = deposits;
      this.totalItems = lastRow ?? + 1;
    });

  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.paginationPageSize = event.pageSize;
    this.loadDeposits();
  }
  onSortChange(sort: Sort) {
    this.colId = sort.active;
    const sortOrder = sort.direction;
    this.sortDirection = sortOrder === 'desc' ? 'desc' : 'asc';
    this.loadDeposits();
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
  createDeposit() {
    const dialogRef = this.dialog.open(AddDepositComponent, {
      width: '400px',
      data: null
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadDeposits();
        this.messageService.showSnackBar('Deposit Added successfully.', 'success-snackbar');
      } else if(result==='') {
        this.messageService.showSnackBar('You have closed dialog without added', 'error-snackbar');
      }
      else if(result==='unsuccess'){
           this.messageService.showSnackBar('Sorry Something Went Wrong! Deposit is not added', 'error-snackbar')
      }
    });
  }
  
  editDeposit(deposit: Deposit) {
    const dialogRef = this.dialog.open(UpdateDepositComponent, {
      width: '400px',
    });
    dialogRef.componentInstance.setData(deposit);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadDeposits();
        this.messageService.showSnackBar('Deposit updated successfully.', 'success-snackbar');
      } else if(result='') {
        this.messageService.showSnackBar('You have closed dialog without update', 'error-snackbar');
      }
      else if(result='unsuccess'){
           this.messageService.showSnackBar('Sorry Something Went Wrong! Deposit is not updated', 'error-snackbar')
      }
    });
  }
  deleteDeposit(deposit: Deposit) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this item?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.depositService.deleteDeposit(deposit.depositID).subscribe(response => {
          this.loadDeposits();
          this.messageService.showSnackBar(' Expenses deleted successfully.', 'success-snackbar');
        });
      }
    });
  }
}

