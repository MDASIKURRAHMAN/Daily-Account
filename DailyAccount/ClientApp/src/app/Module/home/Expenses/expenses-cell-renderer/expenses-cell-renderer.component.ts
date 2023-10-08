import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { UpdateExpensesComponent } from '../update-expenses/update-expenses.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ExpensesService } from 'src/app/Services/expenses.service';

@Component({
  selector: 'app-expenses-cell-renderer',
  templateUrl: './expenses-cell-renderer.component.html',
  styleUrls: ['./expenses-cell-renderer.component.css']
})
export class ExpensesCellRendererComponent implements ICellRendererAngularComp {
  params: any;
  constructor(private modalService: NgbModal,private expensesService:ExpensesService) { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onUpdateClick() {
    // Implement your update logic here
    const modalRef: NgbModalRef = this.modalService.open(UpdateExpensesComponent);
    modalRef.componentInstance.setData(this.params.node.data);
  }

  onDeleteClick() {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      const expensesID = this.params.node.data.expenseID;
      this.expensesService.deleteExpenses(expensesID).subscribe(
        (response) => {
          console.log('Delete successful:', response);
          window.location.reload();
            },
        (error) => {
          console.error('Delete failed:', error);
        }
      );
      
    }
  }

  refresh(): boolean {
    return false;
  }
}
