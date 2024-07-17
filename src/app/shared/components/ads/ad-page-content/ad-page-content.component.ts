import { ActivatedRoute } from '@angular/router';
import { AdService } from '../../../services/ad.service';
import { AdDetails } from '../../../models/ad/ad-details.model';
import { CommonModule } from '@angular/common';
import { AdCardComponent } from '../ad-card/ad-card.component';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core'
import { SplitComponent, AngularSplitModule } from 'angular-split'
import { NgbCarouselModule, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { CtaMyAdComponent } from '../../../../routes/account/ads/my-ad/cta-my-ad/cta-my-ad.component';
import { Subscription } from 'rxjs'
import { DisplayManagementService } from '../../../services/display-management.service';
import { CtaSellerAdComponent } from '../../../../routes/ad/seller-ad/cta-seller-ad/cta-seller-ad.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AdCard } from '../../../models/ad/ad-card.model';
import { AdPageContentService } from './ad-page-content.service';
import { AdListComponent } from '../ad-list/ad-list.component';
import { ArticleState } from '../../../models/enum/article-state.enum';

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
  onLoggedInUserAd: boolean | undefined;
  @Output() sellerAdPageLoaded = new EventEmitter<boolean>();
  @ViewChild('splitAreaA') splitAreaA!: SplitComponent
  @ViewChild('splitAreaB') splitAreaB!: SplitComponent
  currentAd!: AdDetails | undefined;
  selectedPicNumber: number = 2;
  articlePictures: (string | undefined)[] = [];
  areaSizeA!: number
  areaSizeB!: number
  showSeeMorBtn!: boolean;
  pageNumber: number = 0;
  pageSize!: number;
  noMoreAds: boolean = false;
  userOtherAds: AdCard[] = [];
  similarAds: AdCard[] = [];
  userId!: number;
  displayedAdsCount!: number;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private adService: AdService,
    private adPageContentService: AdPageContentService,
    private displayManagementService: DisplayManagementService
  ) {}

  ngOnInit(): void {
    const adId: number | null = Number(this.route.snapshot.paramMap.get(('adId')));
    this.onLoggedInUserAd = !this.route.snapshot.paramMap.has('sellerAlias');
    this.userId = localStorage.getItem('userId') ? Number(localStorage.getItem('userId')!) : 0;

    this.pageSize = this.onLoggedInUserAd ? 8 : 4;
    this.displayedAdsCount = this.pageSize;
    this.adPageContentService.getAdById(adId, this.userId).subscribe({
      next: (ad: AdDetails) => {
        this.currentAd = ad;
          this.articlePictures = [
            // TO DO : to check if it's possible to map the article picture on the back -end (fix Cloudinary branch)
            this.currentAd.firstArticlePictureUrl,
            this.currentAd.secondArticlePictureUrl,
            this.currentAd.thirdArticlePictureUrl,
            this.currentAd.fourthArticlePictureUrl,
            this.currentAd.fifthArticlePictureUrl
          ].filter(url => !!url);
          [this.areaSizeA, this.areaSizeB] = this.setSplitAreasSizes(this.articlePictures.length)

          this.fetchPaginatedAdsList();

          if (!this.onLoggedInUserAd) {
            this.getSimilarAds()
          } else {
            this.adService.isOnSellerAdPageUnLogged(true);
          }

        setTimeout(() => {
          this.isLoading = false;
        }, 600);
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
      `${this.currentAd?.articleState} état`:
      `État ${this.currentAd?.articleState.toLowerCase()}`;
  }

  getSimilarAds(): void {
    this.adPageContentService.getSimilarAds(
      this.currentAd?.category!,
      this.currentAd?.publisherId!,
      this.userId
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
      this.pageNumber,
      this.pageSize,
      this.userId,
      this.currentAd?.id!
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
  }
}
