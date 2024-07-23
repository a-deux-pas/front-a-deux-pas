import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AsyncValidatorService } from '../../../services/async-validator.service';
import { Credentials } from '../../../models/user/credentials.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isFormSubmitted: boolean = false;
  @Output() formSubmitted = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<boolean>();
  showErrorAlert?: boolean = false;

  constructor(
    private AuthService: AuthService,
    private fb: FormBuilder,
    private asyncValidatorService: AsyncValidatorService,
  ) {
    this.loginForm = this.fb.group({
      email: ['',  { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required] }],
      stayLoggedIn: [true],
    }, {
      asyncValidators: this.asyncValidatorService.credentialsValidator(),
      updateOn: 'blur'
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Handle the login form submission
  onSubmit() {
    const credentials = new Credentials (
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value,
      this.loginForm.get('stayLoggedIn')?.value
    )

    if (this.loginForm.valid) {
      this.AuthService.auth(credentials,'login').subscribe({
        next: (data: any) => {
          if (data) {
            this.isFormSubmitted = true;
            this.formSubmitted.emit(this.isFormSubmitted);
            window.location.reload();
          }
        },
        error: (error: any) => {
          this.showErrorAlert = true;
          this.error.emit(this.showErrorAlert);
        },
      });
    }
  }
}

