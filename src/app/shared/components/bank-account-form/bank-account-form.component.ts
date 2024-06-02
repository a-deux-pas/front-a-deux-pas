import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularIbanModule, ValidatorService } from 'angular-iban';

@Component({
  selector: 'app-bank-account-form',
  standalone: true,
  imports: [ReactiveFormsModule, AngularIbanModule],
  templateUrl: './bank-account-form.component.html',
  styleUrl: './bank-account-form.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class BankAccountFormComponent implements OnInit {
  bankAccountForm: any;

  constructor(public parentForm: FormGroupDirective) {}

  ngOnInit() {
    this.bankAccountForm = this.parentForm.form;
    this.bankAccountForm.addControl(
      'bankAccount',
      new FormGroup({
        accountHolder: new FormControl('', [Validators.required]),
        accountNumber: new FormControl('', [Validators.required, ValidatorService.validateIban]),
      })
    );
  }

  get bankAccountFormGroup(): FormGroup {
    return this.bankAccountForm.get('bankAccount') as FormGroup;
  }
}
