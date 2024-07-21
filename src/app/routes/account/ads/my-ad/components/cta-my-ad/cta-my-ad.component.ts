import { Component, Input, OnInit } from '@angular/core';
import { AdDetails } from '../../../../../../shared/models/ad/ad-details.model';
import { CommonModule, formatDate } from '@angular/common';
import { CtaMyAdService } from './cta-my-ad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayManagementService } from '../../../../../../shared/services/display-management.service';
import { ALERTS } from '../../../../../../shared/utils/constants/alert-constants';
import { AdStatus } from '../../../../../../shared/models/enum/ad-status.enum';

@Component({
  selector: 'app-cta-my-ad',
  templateUrl: './cta-my-ad.component.html',
  styleUrl: './cta-my-ad.component.scss',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class CtaMyAdComponent implements OnInit {
  @Input() myAd!: AdDetails | undefined;
  @Input() isBigScreen!: boolean;
  favCount!: number;
  adId!: number;
  adStatus = AdStatus;
  saleDate: Date = new Date();

  constructor(
    private ctaMyAdService: CtaMyAdService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private displayManagementService: DisplayManagementService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // Extract the 'adId' parameter from the URL and convert it to a number
      this.adId = +params['adId']
    })
    this.ctaMyAdService.getFavoriteCount(this.adId).subscribe(favCount =>
      this.favCount = favCount)

    if (this.myAd?.status === 'RESERVED') {
      // TO DO: ajouter une méthode pour récupérer les infos du Buyer via observable (cf adSeller)
      // une fois la table transaction implementée
    }

    if (this.myAd?.status === 'SOLD') {
      // TO DO: ajouter une méthode pour récupérer la date de la vente
      // une fois la table meeting implementée
    }
  }

  goToUpdateAdForm(): void {
    // Navigate to the the current ad update page
    // Goes up one level (..), then adds the adId and 'modification' to the URL
    this.router.navigate(['..', this.adId, 'modification'], { relativeTo: this.activatedRoute });
  }

  goToSellerProfile(): void {
    // TO DO: ajouter le lien vers le seller profil
  }

  deleteAd(): void {
    if (this.myAd?.id) {
      this.ctaMyAdService.deleteAd(this.adId).subscribe({
        next: () => {
          this.router.navigate(['compte/annonces']);
          setTimeout(() => {
            this.displayManagementService.displayAlert(
              ALERTS.AD_DELETED_SUCCESS,
            );
          }, 100);
        },
        error: () => {
          this.displayManagementService.displayAlert(
            ALERTS.DEFAULT_ERROR
          );
        }
      });
    }
  }
}
