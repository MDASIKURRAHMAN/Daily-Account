import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { UpdateDepositComponent } from '../update-deposit/update-deposit.component';
import { DepositsService } from 'src/app/Services/deposits.service';

@Component({
  selector: 'app-cell-renderer',
  templateUrl: './cell-renderer.component.html',
  styleUrls: ['./cell-renderer.component.css']
})
export class CellRendererComponent implements ICellRendererAngularComp {
  values: any;
  @Output() deleteClicked = new EventEmitter<void>();

  constructor(private modalService: NgbModal,private depositService:DepositsService) { }

  agInit(params: ICellRendererParams): void {
    this.values = params;
    console.log(this.values);
  }

  onUpdateClick() {
    const modalRef: NgbModalRef = this.modalService.open(UpdateDepositComponent);
    modalRef.componentInstance.setData(this.values.node.data);
  }

  onDeleteClick() {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      const depositID = this.values.node.data.depositID;
      this.depositService.deleteDeposit(depositID).subscribe(
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
    return true;
  }
}
