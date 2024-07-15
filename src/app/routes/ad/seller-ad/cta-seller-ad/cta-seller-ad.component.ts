import { Component, Input, OnInit } from '@angular/core';
import { AdDetails } from '../../../../shared/models/ad/ad-details.model';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth.service';
import { ConnectionModalComponent } from '../../../../shared/components/connection-modal/connection-modal.component';
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
  currentUserId: number = Number(localStorage.getItem('userId'));
  isLoggedIn!: boolean;
  authSubscription!: Subscription;

  constructor(
    public modalService: NgbModal,
    private authService: AuthService,
    private adFavoriteService: AdFavoriteService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  startCheckout() {
    if (this.isLoggedIn) {
      // To be implemented by Mircea ;)
    } else {
      this.openModal()
    }
  }

  makeAnOffer() {
    if (!this.isLoggedIn) { this.openModal() } else {
      // TO DO :: redirection vers le checkout mircea
    }
  }

  addToFavorites() {
    if (this.isLoggedIn) {
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

  goToSellerProfile() {
    if (this.isLoggedIn) {
      // To be implemented
    } else {
      this.openModal()
    }
  }

  contactTheSeller() {
    if (!this.isLoggedIn) { this.openModal() } else {
      // TO DO :: redirection vers le seller Profile
    }
  }

  openModal() {
    this.modalService.open(ConnectionModalComponent);
  }
}
