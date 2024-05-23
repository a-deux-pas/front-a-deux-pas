import { ActivatedRoute } from '@angular/router';
import { AdService } from '../../../../routes/ad/ad.service';
import { AdPostResponse } from '../../../models/ad/ad-post-response.model';
import { CommonModule, ViewportScroller } from '@angular/common';
import { AdCardComponent } from '../ad-card/ad-card.component';
import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { SplitComponent, AngularSplitModule } from 'angular-split'
import { UiModule } from '../../../utils/module/ui/ui.module';
import { NgbCarouselModule, NgbNavModule, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { CtaMyAdComponent } from '../../../../routes/account/ads/my-ad/cta-my-ad/cta-my-ad.component';
import { Subscription } from 'rxjs'
import { DisplayManagementService } from '../../../services/display-management.service';
import { CtaSellerAdComponent } from '../../../../routes/ad/seller-ad/cta-seller-ad/cta-seller-ad.component';

@Component({
  selector: 'app-ad-page-content',
  standalone: true,
  imports: [
    CommonModule,
    AdCardComponent,
    AngularSplitModule,
    CommonModule,
    UiModule,
    NgbNavModule,
    NgbCarouselModule,
    CtaMyAdComponent,
    CtaSellerAdComponent
  ],
  templateUrl: './ad-page-content.component.html',
  styleUrl: './ad-page-content.component.scss'
})
export class AdPageComponent implements OnInit {
  @Input() adSuccessfullySubmitted: boolean | undefined;
  @Input() isBigScreen: boolean | undefined;
  @Input() windowSizeSubscription!: Subscription;
  @Input() onMyAd: boolean | undefined;

  // TO DO ::  à voir si le nom de la variable change pas pour prendre en compte myAd ou sellerAd
  currentAd: AdPostResponse | undefined;
  selectedPicNumber: number = 2;
  articlePictures: (string | undefined)[] = [];
  areaSizeA!: number
  areaSizeB!: number
  @ViewChild('splitAreaA') splitAreaA!: SplitComponent
  @ViewChild('splitAreaB') splitAreaB!: SplitComponent
  showSeeMorBtn!: boolean;
  adCount!: number;
  pageNumber: number = 0;
  pageSize!: number;
  noMoreAds: boolean = false;
  userOtherAds: AdPostResponse[] = [];
  similarAds: AdPostResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private adService: AdService,
    private viewportScroller: ViewportScroller,
    private displayManagementService: DisplayManagementService,

  ) { }

  ngOnInit(): void {
    this.scrollToTop();
    const adId: number | null = Number(this.route.snapshot.paramMap.get(('adId')));
    this.route.queryParams.subscribe(params => {
      if (params['success'] === 'true') {
        this.adSuccessfullySubmitted = true;
        setTimeout(() => {
          this.adSuccessfullySubmitted = false;
        }, 3000);
      }
    });
    this.adService.findAdById(adId).subscribe({
      next: (ad: AdPostResponse) => {
        this.currentAd = ad;
        console.log('annonce')
        console.log(this.currentAd)
        this.articlePictures = [
          this.currentAd.firstArticlePictureUrl,
          this.currentAd.secondArticlePictureUrl,
          this.currentAd.thirdArticlePictureUrl,
          this.currentAd.fourthArticlePictureUrl,
          this.currentAd.fifthArticlePictureUrl
        ].filter(url => !!url);
        this.selectedPicNumber = this.articlePictures.length;
        [this.areaSizeA, this.areaSizeB] = this.setSplitAreasSizes(this.articlePictures.length);
        this.fetchPaginatedAdsList()
        this.maybeGetSimilarAds()
        // TO DO : à changer une fois la connexion implémentée
        this.adService.getMyAdsCount(1).subscribe({
          next: (adCount: number) => {
            this.adCount = adCount
            this.showSeeMorBtn = this.adCount > 9
          }
        })
      },
      error: error => {
        console.error(error);
      }
    });
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0])
  }

  //changer type de retour
  maybeGetSimilarAds(): any {
    if (!this.onMyAd) {
      console.log(this.currentAd)
      //A faire selon la category ou la sous category au final ??
      this.adService.getSimilarAds(this.currentAd!.category!).subscribe({
        next: (similarAds: AdPostResponse[]) => {
          console.table(similarAds)
          return this.similarAds = similarAds;
        },
        error: error => {
          console.error(error);
        }
      })
    } else {
      return null
    }
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

  loadMoreAds() {
    this.pageNumber++;
    this.fetchPaginatedAdsList();
  }

  // TO DO :: à changer quand le processus de connexion sera implémenté
  fetchPaginatedAdsList() {
    this.pageSize = this.onMyAd ? 9 : 4;
    this.adService.fetchMoreAds(this.currentAd!.publisherId!, this.pageNumber, this.pageSize).subscribe({
      next: (ads: AdPostResponse[]) => {
        this.userOtherAds = [...this.userOtherAds, ...ads];
        this.userOtherAds = this.userOtherAds.filter(ad => ad.id !== this.currentAd!.id);
        this.noMoreAds = this.userOtherAds.length >= (this.adCount - 1) && this.adCount > 9
      }
    });
  }
}
