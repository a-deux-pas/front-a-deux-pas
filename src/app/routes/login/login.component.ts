import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoginFormVisible: boolean = true;
  loginData: any;
  showSuccessAlert?: boolean;
  showErrorAlert?: boolean;

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  // Method to open a modal
  public open(modal: any): void {
    this.modalService.open(modal);
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]], // Define form controls and validators
    password: ['', [Validators.required]],
  });

  // Fonction pour extraire le nom d'utilisateur du token JWT
  extractUsernameFromToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.sub; // Supposons que le nom d'utilisateur soit stocké dans le champ 'sub' de la charge utile
  }

  onLoginSubmit() {
    console.log(this.loginForm.value);

    const { password, email } = this.loginForm.value;
    if (password?.length && email?.length) {
      this.loginService.login(email, password).subscribe({
        next: (data: any) => {
          this.loginData = data;
          console.log('data', data);

          if (data) {
            // Extraire le token
            const token = data;
            localStorage.setItem('token', token);

            // Extraire le nom d'utilisateur du token et le stocker localement
            const username = this.extractUsernameFromToken(token);
            console.log(username);
            localStorage.setItem('username', username);

            this.showSuccessAlert = true;
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
