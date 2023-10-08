import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { ExpensesService } from 'src/app/Services/expenses.service';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit{
  addForm!: FormGroup;
  createdSuccess!: boolean;
  constructor(private formBuilder: FormBuilder, private expensesService: ExpensesService, private router: Router, public dialogRef: MatDialogRef<AddExpensesComponent>) { }

  ngOnInit() {
    this.createdSuccess = false;
    this.addForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required, this.dateValidator]],
      description: ['', [Validators.minLength(6), Validators.maxLength(255), Validators.required]],
    });
  }

  get dateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        return { futureDate: true };
      }

      return null;
    };
  }
  submitForm() {
    if (this.addForm?.invalid) {
      return;
    }
    const amount = this.addForm.get('amount')?.value;
    const date = this.addForm.get('date')?.value;
    const luxonDate = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
    const formattedDate = luxonDate.toFormat('yyyy-MM-dd');
    const description = this.addForm.get('description')?.value;
    const expensesData = {
      amount: amount,
      date: formattedDate,
      description: description
  };
    this.expensesService.createExpenses(expensesData).subscribe(response => {
      this.createdSuccess = true;
      this.dialogRef.close('success');
    },  error => {
      this.createdSuccess = false;
      this.dialogRef.close('unsuccess');
    })
  }
  closeModal() {
    this.dialogRef.close('');
  }
}
