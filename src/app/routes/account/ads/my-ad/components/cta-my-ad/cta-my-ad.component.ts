import { Component, Input, OnInit } from '@angular/core';
import { AdDetails } from '../../../../../../shared/models/ad/ad-details.model';
import { CommonModule } from '@angular/common';
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
  buyerAlias!: string;
  saleDate!: Date;

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
      this.ctaMyAdService.getBuyerAlias(this.myAd.id).subscribe(buyerAlias =>
        this.buyerAlias = buyerAlias);
    }

    if (this.myAd?.status === 'SOLD') {
      this.ctaMyAdService.getSaleDate(this.myAd.id).subscribe({
        next: (saleDate) => {
          this.saleDate = saleDate;
          console.log(this.saleDate);
        },
        error: () => {
          this.saleDate = new Date();
        }
      });
    }
  }

  goToUpdateAdForm(): void {
    // Navigate to the the current ad update page
    // Goes up one level (..), then adds the adId and 'modification' to the URL
    this.router.navigate(['..', this.adId, 'modification'], { relativeTo: this.activatedRoute });
  }

  goToSellerProfile(): void {
    this.router.navigate(['profil', this.buyerAlias]);
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
