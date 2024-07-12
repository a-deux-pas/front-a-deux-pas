import { Component, Input, OnInit } from '@angular/core';
import { AdDetails } from '../../../../shared/models/ad/ad-details.model';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth.service';
import { ConnectionModalComponent } from '../../../../shared/components/connection-modal/connection-modal.component';
import { AdService } from '../../../../shared/services/ad.service';
import { DisplayManagementService } from '../../../../shared/services/display-management.service';
import { AlertMessage } from '../../../../shared/models/enum/alert-message.enum';
import { AlertType } from '../../../../shared/models/alert.model';

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
  currentUserId: number = Number(localStorage.getItem('userId'));
  isLoggedIn!: boolean;
  authSubscription!: Subscription;

  constructor(
    public modalService: NgbModal,
    private authService: AuthService,
    private adService: AdService,
    private displayManagementService: DisplayManagementService
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
    if (this.myAd) {
      this.myAd.favorite = !this.myAd.favorite;
      this.updateAdFavoriteStatus(this.myAd?.id, this.currentUserId, this.myAd.favorite);
    }
  }

  updateAdFavoriteStatus(adId: number, userId: number, isfavorite: boolean) {
    this.adService.updateAdFavoriteStatus(adId, userId, isfavorite).subscribe({
      next: (response) => {
          console.log(response);
          if (isfavorite) {
            this.displayManagementService.displayAlert({
              message: AlertMessage.FAVORITES_ADDED_SUCCESS,
              type: AlertType.SUCCESS,
            });
          } else {
            this.displayManagementService.displayAlert({
              message: AlertMessage.FAVORITES_REMOVED_SUCCESS,
              type: AlertType.SUCCESS,
            });
          }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
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
