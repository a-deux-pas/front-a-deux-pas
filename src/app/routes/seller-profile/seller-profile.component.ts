import { Component } from '@angular/core';
import { UserPresentationComponent } from "../../shared/components/user-presentation/user-presentation.component";
import { UserPresentation } from '../../shared/models/user/user-presentation.model';
import { ActivatedRoute } from '@angular/router';
import { UserPresentationService } from '../../shared/components/user-presentation/user-presentation.service';
import { AdListComponent } from '../../shared/components/ads/ad-list/ad-list.component';
import { AdCard } from '../../shared/models/ad/ad-card.model';
import { SearchBarComponent } from "../../shared/components/navbar/search-bar/search-bar.component";
import { AdService } from '../../shared/services/ad.service';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [UserPresentationComponent, AdListComponent, SearchBarComponent],
  templateUrl: './seller-profile.component.html',
})
export class SellerProfileComponent {
  seller!: UserPresentation;
  sellerSubscription!: Subscription;
  loggedInUserId: number = Number(localStorage.getItem('userId'));
  // ads
  pageNumber: number = 0;
  pageSize: number = 8;
  displayedAdsNumber: number = 8;
  sellerAds: AdCard[] = [];
  noMoreAds: boolean = false;

  constructor(
    private userPresentationService: UserPresentationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private adService: AdService
  ) {}

  ngOnInit(): void {
    this.sellerSubscription = this.userService.seller$.subscribe(
      seller => {
        if (seller) {
          this.seller = seller;
          this.fetchSellerAds();
        } else {
          const sellerAlias = this.route.snapshot.paramMap.get('sellerAlias')!;
          this.fetchUserPresentation(sellerAlias);
        }
    });
  }

  private fetchUserPresentation(userAlias: string): void {
    this.userPresentationService.getUserPresentation(userAlias).subscribe((seller) => {
      this.seller = seller;
      this.fetchSellerAds();
    });
  }

  private fetchSellerAds(): void {
    this.adService.fetchUserAds(
      this.seller.id,
      this.loggedInUserId,
      " ",
      this.pageNumber,
      this.pageSize,
    )
    .subscribe((ads: AdCard[]) => {
      this.sellerAds = [...this.sellerAds, ...ads];
      this.noMoreAds = ads.length <= 0;
    });
  }

  loadMoreAds(): void {
    this.pageNumber++;
    this.fetchSellerAds();
  }

  ngOnDestroy(): void {
    this.sellerSubscription.unsubscribe();
  }
}
