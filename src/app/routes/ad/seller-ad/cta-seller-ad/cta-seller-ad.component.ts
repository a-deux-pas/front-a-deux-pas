import { Component, Input, OnInit } from '@angular/core';
import { AdDetails } from '../../../../shared/models/ad/ad-details.model';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth.service';
import { ConnectionModalComponent } from '../../../../shared/components/connection-modal/connection-modal.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-cta-seller-ad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-seller-ad.component.html',
  styleUrl: './cta-seller-ad.component.scss'
})
export class CtaSellerAdComponent implements OnInit {
  @Input() myAd!: AdDetails | undefined
  @Input() isBigScreen!: boolean;
  @Input() onSellerAdPageUnlogged: boolean = false;
  isUserLoggedIn!: boolean;
  authSubscription!: Subscription;

  constructor(
    public modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn().subscribe(status => {
      this.isUserLoggedIn = status;
    });
  }

  startCheckout() {
    if (this.isUserLoggedIn) {
      // To be implemented by Mircea ;)
    } else {
      this.openModal()
    }
  }

  makeAnOffer() {
    if (!this.isUserLoggedIn) { this.openModal() } else {
      // TO DO :: redirection vers le checkout mircea
    }
  }

  addToFavorites() {
    if (this.isUserLoggedIn) {
      // To be implemented ..
    } else {
      this.openModal()
    }
  }

  goToSellerProfile(sellerAlias: string | undefined, sellerId: number |undefined) {
    if (this.isUserLoggedIn) {
      if (sellerAlias && sellerId) {
        let seller : NavigationExtras = { queryParams: { sellerId } };
        this.router.navigate(['/profil', sellerAlias], {
          state : { seller }
        });
      }
    } else {
      this.openModal()
    }
  }

  contactTheSeller(sellerAlias: string | undefined, sellerId: number |undefined) {
    if (this.isUserLoggedIn) {
      this.goToSellerProfile(sellerAlias, sellerId);
    } else {
      this.openModal()
    }
  }

  openModal() {
    this.modalService.open(ConnectionModalComponent);
  }
}
