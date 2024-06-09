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

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isFormSubmitted: boolean = false;
  @Output() formSubmitted = new EventEmitter<boolean>();
  showErrorAlert?: boolean = false;

  constructor(
    private AuthService: AuthService,
    private fb: FormBuilder,
    private asyncValidatorService: AsyncValidatorService,
  ) {
    this.loginForm = this.fb.group({
      email: ['',  {
        validators: [Validators.required, Validators.email],
        asyncValidators: this.asyncValidatorService.uniqueEmailAddressValidator(true),
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

    this.loginForm.get('email')?.valueChanges.subscribe(email => {
      if (email) {
        this.loginForm.get('password')?.setAsyncValidators(
          this.asyncValidatorService.passwordMatchesEmailValidator(this.loginForm.get('email')!)
        );
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Handle the login form submission
  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email && password) {
      this.AuthService.auth(email, password,'login').subscribe({
        next: (data: any) => {
          if (data) {
            this.isFormSubmitted = true;
            this.formSubmitted.emit(this.isFormSubmitted);
          }
        },
        error: (error: any) => {
          console.error(error);
          this.showErrorAlert = true;
          setTimeout(() => {
            this.showErrorAlert = false;
          }, 3000);
        },
      });
    } else {
      this.showErrorAlert = true;
      setTimeout(() => {
        this.showErrorAlert = false;
      }, 3000);
    }
  }
}



