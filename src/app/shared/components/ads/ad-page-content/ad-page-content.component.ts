import { ActivatedRoute, Router } from '@angular/router';
import { AdService } from '../../../services/ad.service';
import { AdDetails } from '../../../models/ad/ad-details.model';
import { CommonModule } from '@angular/common';
import { AdCardComponent } from '../ad-card/ad-card.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { SplitComponent, AngularSplitModule } from 'angular-split'
import { NgbCarouselModule, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { CtaMyAdComponent } from '../../../../routes/account/ads/my-ad/components/cta-my-ad/cta-my-ad.component';
import { Subscription } from 'rxjs'
import { DisplayManagementService } from '../../../services/display-management.service';
import { CtaSellerAdComponent } from '../../../../routes/ad/seller-ad/cta-seller-ad/cta-seller-ad.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AdCard } from '../../../models/ad/ad-card.model';
import { AdPageContentService } from './ad-page-content.service';
import { AdListComponent } from '../ad-list/ad-list.component';
import { ArticleState } from '../../../models/enum/article-state.enum';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ad-page-content',
  standalone: true,
  imports: [
    AdCardComponent,
    AngularSplitModule,
    CommonModule,
    NgbCarouselModule,
    CtaMyAdComponent,
    CtaSellerAdComponent,
    NavbarComponent,
    AdListComponent
  ],
  templateUrl: './ad-page-content.component.html',
  styleUrl: './ad-page-content.component.scss'
})
export class AdPageComponent implements OnInit {
  @Input() isBigScreen: boolean | undefined;
  @Input() windowSizeSubscription!: Subscription;
  @ViewChild('splitAreaA') splitAreaA!: SplitComponent
  @ViewChild('splitAreaB') splitAreaB!: SplitComponent
  areaSizeA!: number
  areaSizeB!: number
  currentAd!: AdDetails | undefined;
  selectedPicNumber: number = 2;
  articlePictures: string[] = [];
  showSeeMorBtn!: boolean;
  pageNumber: number = 0;
  pageSize!: number;
  displayedAdsCount!: number;
  noMoreAds: boolean = false;
  userOtherAds: AdCard[] = [];
  similarAds: AdCard[] = [];
  logginSubscription!: Subscription;
  loggedInUserId!: number;
  adPublisherId!: number;
  onLoggedInUserAd: boolean | undefined;
  onSellerAd!: boolean;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private adService: AdService,
    private adPageContentService: AdPageContentService,
    private displayManagementService: DisplayManagementService
  ) { }

  ngOnInit(): void {
    const adId: number | null = Number(this.route.snapshot.paramMap.get('adId'));
    this.adPublisherId = Number(sessionStorage.getItem('adPublisherId'));
    this.loggedInUserId = Number(localStorage.getItem('userId'));
    this.onLoggedInUserAd = !this.route.snapshot.paramMap.has('sellerAlias');
    this.onSellerAd = !this.onLoggedInUserAd;
    // Check loggin status
    this.loggedInCheck(adId) ;
    // Fetch the ad
    this.adService.getAdById(adId, this.onSellerAd ? this.loggedInUserId : 0).subscribe({
      next: (ad: AdDetails) => {
        this.currentAd = ad;
        this.articlePictures = ad.articlePictures || [];
        [this.areaSizeA, this.areaSizeB] = this.setSplitAreasSizes(this.currentAd.articlePictures!.length)
        // Fetch the ads list
        this.pageSize = this.onLoggedInUserAd ? 8 : 4;
        this.displayedAdsCount = this.pageSize;
        this.fetchPaginatedAdsList();

        if (this.onSellerAd) {
          // Fetch ads list with the same category
          this.getSimilarAds();
        }  else {
          this.adService.setAd(this.currentAd);
        }
        // Waits pictures loading
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
      }
    });
  }

  loggedInCheck(adId: number) {
    this.logginSubscription = this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this.adService.isOnSellerAdPageUnLogged(true);
      }
      if (isLoggedIn && this.adPublisherId == this.loggedInUserId) {
        this.router.navigate(['compte/annonces/mon-annonce/', adId]);
      }
    });
  }

  setSplitAreasSizes(nPictures: number) {
    switch (nPictures) {
      case 3:
        return [30, 70]
      case 4:
        return [25, 75]
      case 5:
        return [15, 85]
      default:
        return [50, 50]
    }
  }

  togglePaused() {
    this.displayManagementService.togglePaused()
  }

  onSlide(slideEvent: NgbSlideEvent) {
    this.displayManagementService.onSlide(slideEvent)
  }

  articleStateDisplay(): string {
    return this.currentAd?.articleState === ArticleState.MINT_CONDITION
      || this.currentAd?.articleState === ArticleState.GOOD_CONDITION ?
      `${this.currentAd?.articleState} état` :
      `État ${this.currentAd?.articleState.toLowerCase()}`;
  }

  getSimilarAds(): void {
    this.adPageContentService.getSimilarAds(
      this.currentAd?.category!,
      this.currentAd?.publisherId!,
      this.loggedInUserId
    ).subscribe({
      next: (similarAds: AdCard[]) => {
        this.similarAds = similarAds;
        return similarAds;
      }
    })
  }

  fetchPaginatedAdsList() {
    this.adService.fetchUserAds(
      this.currentAd?.publisherId!,
      this.onSellerAd ? this.adPublisherId : this.loggedInUserId,
      this.currentAd?.id!,
      this.pageNumber,
      this.pageSize
    ).subscribe({
      next: (ads: AdCard[]) => {
        this.userOtherAds = [...this.userOtherAds, ...ads];
        this.noMoreAds = ads.length <= 0;
      }
    });
  }

  loadMoreAds() {
    this.pageNumber++;
    this.fetchPaginatedAdsList();
  }

  ngOnDestroy() {
    this.adService.isOnSellerAdPageUnLogged(false);
    this.logginSubscription.unsubscribe();
    sessionStorage.removeItem('adPublisherId');
  }
}
