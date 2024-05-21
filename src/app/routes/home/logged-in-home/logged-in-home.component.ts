import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-logged-in-home',
  templateUrl: './logged-in-home.component.html',
  styleUrl: './logged-in-home.component.scss',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
})
export class LoggedInHomeComponent {
  showSuccessAlert: boolean = false;
  constructor(public modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then((result) => {
      // Modal closed with success
      if (result === 'Close click') {
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 3000);
      }
    });
  }
}
