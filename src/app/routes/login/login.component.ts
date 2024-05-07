import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ],
})
export class LoginComponent {
  loginData: any;
  showSuccessAlert?: boolean;
  showErrorAlert?: boolean;

  constructor(
    private modalService: NgbModal,
    private AuthService: AuthService,
    private fb: FormBuilder
  ) {}

  // Define form controls and validators
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    stayLoggedIn: [true],
  });

  // Function to extract email of user from the JWT token
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
          console.log(data);
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
