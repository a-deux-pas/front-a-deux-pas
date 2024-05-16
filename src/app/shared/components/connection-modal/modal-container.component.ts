import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../routes/login/login.component';
import { RegisterComponent } from '../../../routes/register/register.component';
import { Subject } from 'rxjs';
import { ConnectionModalComponent } from './connection-modal.component';

@Component({
  selector: 'app-modal-container',
  template: '',
  standalone: true,
  imports: [
    NgbModule,
    LoginComponent,
    RegisterComponent,
    ConnectionModalComponent,
  ],
})
export class ModalContainerComponent implements OnDestroy {
  destroy = new Subject<void>();

  modalRef!: NgbModalRef;

  // @ViewChild('loginModal') loginModal: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public route: ActivatedRoute
  ) {
    // route.params.pipe(takeUntil(this.destroy)).subscribe((params) => {
    //   // When router navigates on this component is takes the params and opens up the photo detail modal
    // });

    // this.activatedRoute.url.subscribe(url =>{
    //      console.log(url);
    // });
    this.route.url.subscribe((url) => {
      console.log(url);

      if (this.modalRef) {
        this.modalRef.close();
      }

      this.modalRef = this.modalService.open(ConnectionModalComponent);

      // Go back to home page after the modal is closed
      this.modalRef.result.then(
        (result) => {},
        (reason) => {
          if (reason == 0) {
            router.navigateByUrl('/');
          }
        }
      );
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
