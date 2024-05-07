import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../routes/login/login.component';
import { RegisterComponent } from '../../../routes/register/register.component';

@Component({
  selector: 'app-mynavbar',
  templateUrl: './mynavbar.component.html',
  styleUrl: './mynavbar.component.scss',
  standalone: true,
  imports: [NgbModule, LoginComponent, RegisterComponent],
})
export class MynavbarComponent {
  isLoginFormVisible: boolean = false;
  isRegisterFormVisible: boolean = false;

  constructor(private modalService: NgbModal, private router: Router) {}

  // Method to open a modal
  public open(modal: any): void {
    this.modalService.open(modal);
    this.isLoginFormVisible = true;
  }

  loginFormVisibil() {
    this.isLoginFormVisible = true;
    this.isRegisterFormVisible = false;
  }

  registerFormVisibil() {
    this.isLoginFormVisible = false;
    this.isRegisterFormVisible = true;
  }
}
