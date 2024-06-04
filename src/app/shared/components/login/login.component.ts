import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ProfileService } from '../../../routes/account/profile/profile.service';
import { User } from '../../models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [CommonModule, NgbModalModule, ReactiveFormsModule, FormsModule],
})
export class LoginComponent {
  loginData: any;
  isLoginFormVisible: boolean = true;
  showErrorAlert?: boolean = false;
  user!: User;

  constructor(
    public activeModal: NgbActiveModal,
    private AuthService: AuthService,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) { }

  showLoginForm() {
    this.isLoginFormVisible = true;
  }

  showRegisterForm() {
    this.isLoginFormVisible = false;
  }

  // Define form controls and validators
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    stayLoggedIn: [true],
  });

  // Function to extract email of user from the JWT token
  extractEmailFromToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.sub;
  }

  // Put the current userId in the localStorage
  getUserId(userEmail: string) {
    this.AuthService.getUserDetails(userEmail).subscribe({
      next: (user: User) => {
        this.user = user
        console.log('userDetail')
        console.table(this.user)
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  // Handle the login form submission
  onLoginSubmit() {
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
            this.getUserId(userEmail);
            localStorage.setItem('userEmail', userEmail);
            this.activeModal.close('Close click');
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
