import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncValidatorService } from '../../../services/async-validator.service';
import { CommonModule } from '@angular/common';
import { checkEqualityValidator, passwordValidator } from '../../../utils/validators/custom-validators';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Credentials } from '../../../models/user/credentials.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isFormSubmitted: boolean = false;
  @Output() formSubmitted = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<boolean>();
  showErrorAlert?: boolean = false;

  constructor(
    private fb: FormBuilder,
    private asyncValidatorService: AsyncValidatorService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', {
        validators: [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        asyncValidators: this.asyncValidatorService.uniqueEmailAddressValidator(false),
        updateOn: 'blur'
        }
      ],
      password: ['', passwordValidator()],
      confirmPassword: ['', Validators.required],
      rgpdConsent: [true]
    },
    {
      validators: checkEqualityValidator('password','confirmPassword')
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    const credentials = new Credentials (
      this.registerForm.get('email')?.value,
      this.registerForm.get('password')?.value,
      true,
    )

    if (this.registerForm.valid) {
      this.authService.auth(credentials,'signup').subscribe({
        next: (data: any) => {
          if (data) {
          setTimeout(() => {
            this.router.navigate(['/inscription']);
          }, 0);
          this.isFormSubmitted = true;
          this.formSubmitted.emit(this.isFormSubmitted);
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
