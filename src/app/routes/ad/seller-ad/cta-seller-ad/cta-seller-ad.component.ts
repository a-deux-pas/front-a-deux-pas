import { Component, Input, OnInit } from '@angular/core';
import { AdDetails } from '../../../../shared/models/ad/ad-details.model';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth.service';
import { ConnectionModalComponent } from '../../../../shared/components/connection-modal/connection-modal.component';
import { Router } from '@angular/router';
import { CheckoutService } from '../../../checkout/checkout.service';

@Component({
  selector: 'app-cta-seller-ad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-seller-ad.component.html',
  styleUrl: './cta-seller-ad.component.scss',
})
export class CtaSellerAdComponent implements OnInit {
  @Input() myAd!: AdDetails | undefined;
  @Input() isBigScreen!: boolean;
  @Input() onSellerAdPageUnlogged: boolean = false;
  isLoggedIn!: boolean;
  authSubscription!: Subscription;

  constructor(
    public modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService
      .isLoggedIn()
      .subscribe((status) => {
        this.isLoggedIn = status;
      });
  }

  startCheckout() {
    if (this.isLoggedIn) {
      // To be implemented by Mircea ;)
      this.checkoutService.setCheckoutAd(this.myAd);
      this.router.navigate(['/checkout']);
    } else {
      this.openModal();
    }
  }

  makeAnOffer() {
    if (!this.isLoggedIn) {
      this.openModal();
    } else {
      // TO DO :: redirection vers le checkout mircea
      this.checkoutService.setCheckoutAd(this.myAd);
      this.router.navigate(['/checkout']);
    }
  }

  addToFavorites() {
    if (this.isLoggedIn) {
      // To be implemented ..
    } else {
      this.openModal();
    }
  }

  goToSellerProfile() {
    if (this.isLoggedIn) {
      // To be implemented
    } else {
      this.openModal();
    }
  }

  contactTheSeller() {
    if (!this.isLoggedIn) {
      this.openModal();
    } else {
      // TO DO :: redirection vers le seller Profile
    }
  }

  openModal() {
    this.modalService.open(ConnectionModalComponent);
  }
}
