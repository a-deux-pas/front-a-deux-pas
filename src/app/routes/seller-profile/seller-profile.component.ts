import { Component } from '@angular/core';
import { UserPresentationComponent } from "../../shared/components/user-presentation/user-presentation.component";
import { UserPresentation } from '../../shared/models/user/user-presentation.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPresentationService } from '../../shared/components/user-presentation/user-presentation.service';
import { AdListComponent } from '../../shared/components/ads/ad-list/ad-list.component';
import { AdCard } from '../../shared/models/ad/ad-card.model';
import { SearchBarComponent } from "../../shared/components/navbar/search-bar/search-bar.component";
import { AdService } from '../../shared/services/ad.service';

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [UserPresentationComponent, AdListComponent, SearchBarComponent],
  templateUrl: './seller-profile.component.html',
})
export class SellerProfileComponent {
  navigation: any;
  sellerFromHomePage!: UserPresentation;
  sellerIdFromAd!: number;
  previousPage!: string;
  seller!: UserPresentation;
  sellerAlias!: string;
  sellerId!: number;
  loggedInUserId: number = Number(localStorage.getItem('userId'));
  // ads
  pageNumber: number = 0;
  pageSize: number = 8;
  displayedAdsNumber: number = 8;
  sellerAds: AdCard[] = [];
  noMoreAds: boolean = false;

  constructor(
    private userPresentationService: UserPresentationService,
    private router: Router,
    private route: ActivatedRoute,
    private adService: AdService
  ) {
      this.navigation = this.router.getCurrentNavigation()?.extras.state;
      // get seller object if the user accesses the seller profile from the home page
      this.sellerFromHomePage = this.navigation.seller.queryParams.seller;
      // get seller ID if the user accesses the seller profile from the ad page
      this.sellerIdFromAd = this.navigation.seller.queryParams.sellerId;
    }

  ngOnInit(): void {
    if (this.sellerFromHomePage) {
      this.seller = this.sellerFromHomePage;
      this.sellerAlias = this.seller.alias;
    } else {
      this.sellerAlias = this.route.snapshot.paramMap.get('sellerAlias')!;
      this.fetchUserPresentation(this.sellerAlias);
    }

    if (this.sellerIdFromAd) {
      this.sellerId = this.sellerIdFromAd;
    }

    this.fetchSellerAds();
  }

  private fetchUserPresentation(userAlias: string): void {
    this.userPresentationService.getUserPresentation(userAlias).subscribe((seller) => {
      this.seller = seller;
    });
  }

  private fetchSellerAds(): void {
    this.adService.fetchUserAds(
      this.sellerId ?? this.seller.id,
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

  loadMoreAds() {
    this.pageNumber++;
    this.fetchSellerAds();
  }
}
