import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { accountRoutes } from '../../../routes/account/account-routing.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectionModalComponent } from '../connection-modal/connection-modal.component';
import { AdService } from '../../services/ad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchBarComponent]
})
export class NavbarComponent implements OnInit {
  @Output() accountMenuToggleOutput: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() isAccountMenuOpen: boolean = false;
  accountRoutes = accountRoutes;
  @Input() isUserLoggedIn!: boolean
  onSellerAdPageUnlogged: boolean = false;
  isRegistrationPage: boolean = false;
  onSellerAdPageUnloggedSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    public modalService: NgbModal,
    private adService: AdService) {
    this.router.events.subscribe(event => {
      this.isRegistrationPage = this.router.url.includes('/inscription');
    });
  }

  ngOnInit(): void {
    this.onSellerAdPageUnloggedSubscription = this.adService.sellerAdPageLoaded$.subscribe((boolean) => {
      this.onSellerAdPageUnlogged = boolean;
    })
  }

  toggleAccountMenuState() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
    this.accountMenuToggleOutput.emit(this.isAccountMenuOpen);
  }

  logout() {
    this.authService.logout();
  }

  openModal() {
    this.modalService.open(ConnectionModalComponent);
  }

  openModalOrSell() {
    this.isUserLoggedIn ? this.router.navigate(['annonce/creation']) : this.openModal();
  }

  ngOnDestroy() {
    this.onSellerAdPageUnloggedSubscription.unsubscribe();
  }
}
