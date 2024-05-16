import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../routes/login/login.component';
import { RegisterComponent } from '../../../routes/register/register.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-connection-modal',
  templateUrl: './connection-modal.component.html',
  styleUrls: ['./connection-modal.component.scss'],
  standalone: true,
  imports: [NgbModule, LoginComponent, RegisterComponent],
})
export class ConnectionModalComponent implements AfterViewInit, OnDestroy {
  isLoginFormVisible: boolean = false;
  isRegisterFormVisible: boolean = false;

  modalRef!: NgbModalRef;
  routerSubscription!: Subscription;

  @ViewChild('loginModal') loginModal: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    if (this.router.url === '/login' || this.router.url === '/register') {
      this.open();
    }

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/login' || this.router.url === '/register') {
          this.open();
        } else if (this.modalRef) {
          this.modalRef.close();
        }
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  open(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef.result.finally(() => {
        this.showModal();
      });
    } else {
      this.showModal();
    }
  }

  showModal(): void {
    this.modalRef = this.modalService.open(this.loginModal);
    this.updateFormVisibility();
  }

  loginFormVisibile() {
    this.router.navigate(['login'], { relativeTo: this.route }).then(() => {
      this.updateFormVisibility();
    });
  }

  registerFormVisibile() {
    this.router.navigate(['register'], { relativeTo: this.route }).then(() => {
      this.updateFormVisibility();
    });
  }

  private updateFormVisibility() {
    if (this.router.url === '/login') {
      this.isLoginFormVisible = true;
      this.isRegisterFormVisible = false;
    } else if (this.router.url === '/register') {
      this.isLoginFormVisible = false;
      this.isRegisterFormVisible = true;
    }
  }
}
