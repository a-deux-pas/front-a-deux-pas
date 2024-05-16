import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  Router,
  RouterModule,
  RouterOutlet,
  NavigationEnd,
} from '@angular/router';
import { ConnectionModalComponent } from './shared/components/connection-modal/connection-modal.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, ConnectionModalComponent, RouterModule],
})
export class AppComponent implements AfterViewInit {
  title = 'front';
  @ViewChild(ConnectionModalComponent)
  connectionModalComponent!: ConnectionModalComponent;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    if (this.router.url === '/login' || this.router.url === '/register') {
      this.openLoginModal();
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          if (this.connectionModalComponent) {
            if (
              this.router.url === '/login' ||
              this.router.url === '/register'
            ) {
              this.openLoginModal();
            } else if (this.connectionModalComponent.modalRef) {
              this.connectionModalComponent.modalRef.close();
            }
          }
        });
      });
  }

  openLoginModal() {
    if (this.connectionModalComponent.modalRef) {
      this.connectionModalComponent.modalRef.close();
      this.connectionModalComponent.modalRef.result.finally(() => {
        this.connectionModalComponent.open();
      });
    } else {
      this.connectionModalComponent.open();
    }
  }
}
