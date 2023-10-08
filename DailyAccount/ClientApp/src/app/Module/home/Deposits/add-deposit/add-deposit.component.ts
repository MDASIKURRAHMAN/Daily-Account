import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { DepositsService } from 'src/app/Services/deposits.service';

@Component({
  selector: 'app-add-deposit',
  templateUrl: './add-deposit.component.html',
  styleUrls: ['./add-deposit.component.css']
})
export class AddDepositComponent implements OnInit {
  addForm!: FormGroup;
  createdSuccess!: boolean;
  constructor(private formBuilder: FormBuilder, private depositService: DepositsService, private router: Router, public dialogRef: MatDialogRef<AddDepositComponent>) { }

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
    const depositData = {
      amount: amount,
      date: formattedDate,
      description: description
  };
    this.depositService.createDeposit(depositData).subscribe(response => {

      this.createdSuccess = true;
      this.dialogRef.close('success');
      
    },
    error => {
      // Handle any errors that occur during the HTTP request
      this.createdSuccess = false;
      this.dialogRef.close('unsuccess');
    })
  }
  closeModal() {
    this.dialogRef.close('');
  }
}
