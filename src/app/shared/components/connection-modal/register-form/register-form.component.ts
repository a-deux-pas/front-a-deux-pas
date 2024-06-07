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
  isFormSubmitted: boolean = false;
  @Output() formSubmitted = new EventEmitter<boolean>();
  showErrorAlert?: boolean = false;

  constructor(
    private fb: FormBuilder,
    private uniqueEmailValidator: AsyncValidatorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', {
        validators: [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        asyncValidators: this.uniqueEmailValidator.uniqueEmailAddressValidator(),
        updateOn: 'blur'
        } as AbstractControlOptions
      ],
      password: ['', passwordValidator()],
      confirmPassword: ['', Validators.required],
      termsAndConditions: [true, Validators.required]
    },
    {
      validators: checkEqualityValidator('password','confirmPassword')
    }
  );
  }

  onSubmit() {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    console.log(email, password);
    //TO DO = à remplacer par isFormValid
    if (email && password) {
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
