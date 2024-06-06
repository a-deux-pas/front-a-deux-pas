import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

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

  constructor(public activeModal: NgbActiveModal) {}

  showLoginForm() {
    this.isLoginFormVisible = true;
  }

  showRegisterForm() {
    this.isLoginFormVisible = false;
  }

  isLoginFormSubmitted(isFormSubmitted: boolean) {
    if (isFormSubmitted) {
      this.activeModal.close('Close click');
    }
  }
}
