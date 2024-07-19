import { Component, Input, OnInit } from '@angular/core';
import { AdDetails } from '../../../../shared/models/ad/ad-details.model';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth.service';
import { ConnectionModalComponent } from '../../../../shared/components/connection-modal/connection-modal.component';
import { NavigationExtras, Router } from '@angular/router';
import { AdFavoriteService } from '../../../../shared/services/ad-favorite.service';

@Component({
  selector: 'app-cta-seller-ad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-seller-ad.component.html',
  styleUrl: './cta-seller-ad.component.scss'
})
export class CtaSellerAdComponent implements OnInit {
  @Input() ad!: AdDetails | undefined;
  @Input() isBigScreen!: boolean;
  @Input() onSellerAdPageUnlogged: boolean = false;
  isUserLoggedIn!: boolean;
  currentUserId: number = Number(localStorage.getItem('userId'));
  isLoggedIn!: boolean;
  logginSubscription!: Subscription;

  constructor(
    public modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private adFavoriteService: AdFavoriteService
  ) {}

  ngOnInit(): void {
    this.logginSubscription = this.authService.isLoggedIn().subscribe(status => {
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
      // TO DO : redirection vers le checkout mircea
    }
  }

  addToFavorites() {
    if (this.isUserLoggedIn) {
      if (this.ad) {
        this.ad.favorite = !this.ad.favorite;
        this.adFavoriteService.updateAdFavoriteStatus(
          this.ad.id,
          this.currentUserId,
          this.ad.favorite,
          this.ad
        );
      }
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

  contactTheSeller(adPublisherEmail: string | undefined,) {
    if (this.isUserLoggedIn) {
      window.location.href = `mailto:${adPublisherEmail}`;
    } else {
      this.openModal()
    }
  }

  openModal() {
    this.modalService.open(ConnectionModalComponent);
  }

  ngOnDestroy(): void {
    this.logginSubscription.unsubscribe();
  }
}
