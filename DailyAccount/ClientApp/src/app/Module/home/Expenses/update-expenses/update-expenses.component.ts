import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { ExpensesService } from 'src/app/Services/expenses.service';

@Component({
  selector: 'app-update-expenses',
  templateUrl: './update-expenses.component.html',
  styleUrls: ['./update-expenses.component.css']
})
export class UpdateExpensesComponent implements OnInit {
  data: any;
  updateForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateExpensesComponent>,
    private formBuilder: FormBuilder,
    private expensesService: ExpensesService
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
    const expensesData = {
      expensesId : this.data?.expenseID,
      amount: amount,
      date: formattedDate,
      description: description
  };
    this.expensesService.updateExpenses(expensesData).subscribe(response => {
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
