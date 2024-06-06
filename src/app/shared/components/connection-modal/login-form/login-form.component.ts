import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginFormComponent {
  isFormSubmitted: boolean = false;
  @Output() loginFormSubmitted = new EventEmitter<boolean>();
  loginData: any;
  showErrorAlert?: boolean = false;

  // Define form controls and validators
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    stayLoggedIn: [true],
  });

  constructor(
    private AuthService: AuthService,
    private fb: FormBuilder
  ) {}

  // Function to extract email of user from the JWT token
  extractEmailFromToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.sub;
  }

  // Handle the login form submission
  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email && password) {
      this.AuthService.login(email, password).subscribe({
        next: (data: any) => {
          this.loginData = data;
          if (data) {
            const token = data;
            localStorage.setItem('token', token);
            const userEmail = this.extractEmailFromToken(token);
            localStorage.setItem('userEmail', userEmail);
            this.isFormSubmitted = true;
            this.loginFormSubmitted.emit(this.isFormSubmitted);
            console.log(this.isFormSubmitted);
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
