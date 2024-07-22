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
      email: ['',  {
          validators: [Validators.required, Validators.email],
          asyncValidators: this.asyncValidatorService.uniqueEmailAddressValidator(false),
          updateOn: 'blur'
        }
      ],
      password: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
        }
      ],
      stayLoggedIn: [true],
    });

    const emailControl = this.loginForm.get('email');
    if (emailControl) {
      this.loginForm.get('email')?.valueChanges.subscribe(email => {
        if (email) {
          this.loginForm.get('password')?.setAsyncValidators(
            this.asyncValidatorService.passwordMatchesEmailValidator(emailControl)
          );
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName)!;
    return field.invalid && (field.dirty || field.touched);
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

