import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { DepositsService } from 'src/app/Services/deposits.service';

@Component({
  selector: 'app-update-deposit',
  templateUrl: './update-deposit.component.html',
  styleUrls: ['./update-deposit.component.css']
})
export class UpdateDepositComponent implements OnInit {
  data: any;
  updateForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateDepositComponent>,
    private formBuilder: FormBuilder,
    private depositService: DepositsService
  ) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      amount: [this.data?.amount, [Validators.required, Validators.min(0)]],
      date: [this.extractDateFromDateTime(this.data?.date), Validators.required],
      description: [
        this.data?.description,
        [Validators.required, Validators.minLength(6), Validators.maxLength(255)]
      ]
      
    });
  }

  closeModal() {
    this.dialogRef.close('');
  }

  submitForm() {
    if (this.updateForm?.invalid) {
      return;
    }
    const amount = this.updateForm.get('amount')?.value;
    const date = this.updateForm.get('date')?.value;
    const luxonDate = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
    const formattedDate = luxonDate.toFormat('yyyy-MM-dd');
    const description = this.updateForm.get('description')?.value;
    const depositData = {
      depositId: this.data?.depositID,
      amount: amount,
      date: formattedDate,
      description: description
  };
    this.depositService.updateDeposit(depositData).subscribe(response => {
      this.dialogRef.close('success');
    },  error => {
      this.dialogRef.close('unsuccess');
    })
  }

  setData(data: any) {
    this.data = data;
  }

  private extractDateFromDateTime(dateTime: string): string {
    return dateTime ? dateTime.split('T')[0] : '';
  }
}
