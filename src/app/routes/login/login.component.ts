import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginData: any;
  showSuccessAlert?: boolean;
  showErrorAlert?: boolean;
  isLoginFormVisible: boolean = true;
  isRegisterFormVisible: boolean = false;

  toggleLoginFormVisibility() {
    this.isLoginFormVisible = true;
    this.isRegisterFormVisible = false;
  }

  toggleRegisterFormVisibility() {
    this.isLoginFormVisible = false;
    this.isRegisterFormVisible = true;
  }

  constructor(
    private modalService: NgbModal,
    private AuthService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  // Method to open a modal
  public open(modal: any): void {
    this.modalService.open(modal);
  }

  // Define form controls and validators
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    stayLoggedIn: [true],
  });

  // Fuction to extract email of user from the JWT token
  extractEmailFromToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.sub;
  }

  onLoginSubmit() {
    const { password, email } = this.loginForm.value;

    if (password?.length && email?.length) {
      this.AuthService.login(email, password).subscribe({
        next: (data: any) => {
          // Extarct Token
          this.loginData = data;

          if (data) {
            // Save Token in the localStorage
            const token = data;
            localStorage.setItem('token', token);

            // Save email in the localStorage
            const userEmail = this.extractEmailFromToken(token);
            localStorage.setItem('userEmail', userEmail);

            // Show success alert
            this.showSuccessAlert = true;

            // Close modal
            this.modalService.dismissAll('Save click');
          }
        },
        error: (error: any) => {
          this.showErrorAlert = true;
          this.modalService.dismissAll('Save click');
        },
      });
    }
  }
}
