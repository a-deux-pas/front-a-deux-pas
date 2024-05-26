import { Component, ViewEncapsulation } from '@angular/core';
import { SearchBarComponent } from '../../../../../shared/components/navbar/search-bar/search-bar.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SearchBarComponent, NgbModalModule],
})
export class HeaderComponent {
  showSuccessAlert: boolean = false;

  constructor(public modalService: NgbModal, private router: Router) {}

  /*
   * This method is designed to open a modal when the 'openModal' button is clicked.
   * It utilizes the NgbModal service to create and manage the modal instance.
   */

  openModal() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then((result) => {
      // Modal closed with success
      if (result === 'Close click') {
        // Redirect to 'logged-in-home'
        this.router.navigate(['/accueil']);
      }
    });
  }
}
