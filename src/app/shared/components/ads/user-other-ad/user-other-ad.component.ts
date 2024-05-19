import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';
import { AdCardComponent } from '../ad-card/ad-card.component';
import { AdService } from '../../../../routes/ad/ad.service';

@Component({
  selector: 'app-user-other-ad',
  standalone: true,
  imports: [
    CommonModule,
    AdCardComponent
  ],
  template: `
  <!-- user's other ads section -->
    <section class="mt-5 mb-5 other-ads-list-section">
        <p id="other-ad-section-title" [ngClass]="{'text-center': isBigScreen == false, '': isBigScreen == true}">Mes
            autres
            annonces</p>
        <div class="user-other-ads">
            @for (otherAd of otherAds; track otherAd) {
            <a href="/compte/annonces/mon-annonce/{{otherAd.id}}">
                <app-ad-card [ad]="otherAd" [mine]="true"></app-ad-card>
            </a>
            }
        </div>
    </section>

    <!-- See more button -->
@if (!noMoreAds && showSeeMorBtn) {
<button type="submit" class="btn-info mt-4 mx-auto" (click)="loadMoreAds()">voir plus<img class="arrow-down-icon"
        src="/assets/icons/buttons/arrow-down.webp" alt="icône de flèche vers le bas">
</button>
}
@if (noMoreAds && otherAds.length > 9) {
<div class="no-ads-message">
    <p><i>Fin des résultats</i></p>
</div>
}
  `,
  styleUrl: './user-other-ad.component.scss'
})
export class UserOtherAdComponent implements OnInit {
  @Input() thisAd!: AdPostResponse
  @Input() isBigScreen!: boolean

  otherAds: AdPostResponse[] = [];

  pageNumber: number = 0;
  pageSize: number = 9;
  noMoreAds: boolean = false;
  showSeeMorBtn!: boolean;
  adCount!: number;

  constructor(
    private adService: AdService,
  ) { }

  ngOnInit(): void {
    this.fetchPaginatedAdsList();
    // TO DO : à changer une fois la connexion implémentée
    this.adService.getMyAdsCount(1).subscribe({
      next: (adCount: number) => {
        this.adCount = adCount;
        this.showSeeMorBtn = this.adCount > 9;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadMoreAds() {
    this.pageNumber++;
    this.fetchPaginatedAdsList();
  }

  // TO DO :: à changer quand le processus de connexion sera implémenté
  fetchPaginatedAdsList() {
    this.adService.fetchMoreAds(1, this.pageNumber, this.pageSize).subscribe({
      next: (ads: AdPostResponse[]) => {
        this.otherAds = [...this.otherAds, ...ads];
        this.otherAds = this.otherAds.filter(ad => ad.id !== this.thisAd!.id);
        this.noMoreAds = this.otherAds.length >= (this.adCount - 1)
      }
    });
  }
}
