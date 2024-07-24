import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-connection-modal',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './connection-modal.component.html',
  styleUrl: './connection-modal.component.scss'
})
export class ConnectionModalComponent {
  loginData: any;
  isLoginFormVisible: boolean = true;
  showErrorAlert?: boolean = false;
  isUserLoggedIn: boolean = false;
  formSubmitted: boolean = false;
  logginSubscription!: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private authService: AuthService
  ) {}

  showLoginForm() {
    this.isLoginFormVisible = true;
  }

  showRegisterForm() {
    this.isLoginFormVisible = false;
  }

  closeModal() {
    this.activeModal.close('Close click');
  }

  isFormSubmitted(formSubmitted: boolean, formType: string) {
    if (formSubmitted) {
      this.closeModal();
      formType === 'login'? this.refreshCurrentPage() : this.goToProfileForm();
    }
  }

  private refreshCurrentPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]).then(() => {
        setTimeout(() => {
          this.authService.updateLoginStatus(true);
        }, 200);
      });
    });
  }

  private goToProfileForm() {
    // Pass a parameter in the URL to inform the authGuard that the user
    // can access the profile form before updating the login status
    this.router.navigate(['/inscription'],
      { queryParams: { suite: 'profil' } }).then(() => {
      this.authService.updateLoginStatus(true);
    });
  }

  showError(showErrorAlert: boolean) {
    this.showErrorAlert = showErrorAlert;
    if (this.showErrorAlert) {
      setTimeout(() => {
        this.showErrorAlert = false;
      }, 3000);
    }
  }
}
