import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncValidatorService } from '../../../services/async-validator.service';
import { CommonModule } from '@angular/common';
import { checkEqualityValidator, passwordValidator } from '../../../utils/validators/custom-validators';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isFormSubmitted: boolean = false;
  @Output() formSubmitted = new EventEmitter<boolean>();
  showErrorAlert?: boolean = false;

  constructor(
    private fb: FormBuilder,
    private asyncValidatorService: AsyncValidatorService,
    private authService: AuthService,
    private router: Router
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
    }
  );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    console.log(this.registerForm.valid);

    if (this.registerForm.valid) {
      this.authService.auth(email, password,'signup').subscribe({
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
