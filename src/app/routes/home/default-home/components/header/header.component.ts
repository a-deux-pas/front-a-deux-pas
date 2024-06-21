import { Component, ViewEncapsulation } from '@angular/core';
import { SearchBarComponent } from '../../../../../shared/components/navbar/search-bar/search-bar.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnectionModalComponent } from '../../../../../shared/components/connection-modal/connection-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SearchBarComponent, NgbModalModule],
})
export class HeaderComponent {

  constructor(public modalService: NgbModal) {}

  /*
   * This method is designed to open a modal when the 'openModal' button is clicked.
   * It utilizes the NgbModal service to create and manage the modal instance.
   */

  openModal() {
    this.modalService.open(ConnectionModalComponent);
  }
}
