import { ActivatedRoute } from '@angular/router';
import { AdService } from '../../../ad/ad.service';
import { AdPostResponse } from '../../../../shared/models/ad/ad-post-response.model';
import { NgbCarousel, NgbCarouselModule, NgbNavModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, ViewportScroller } from '@angular/common';
import { AdCardComponent } from '../../../../shared/components/ads/ad-card/ad-card.component';
import { DisplayManagementService } from '../../../../shared/services/display-management.service';
import { Component, ViewChild, OnInit, Input } from '@angular/core'
import { Subscription } from 'rxjs'
import { SplitComponent, AngularSplitModule } from 'angular-split'
import { UiModule } from '../../../../shared/module/ui/ui.module';



@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  styleUrl: './my-ad.component.scss',
  standalone: true,
  imports: [
    NgbNavModule,
    NgbCarouselModule,
    CommonModule,
    AdCardComponent,
    AngularSplitModule,
    UiModule
  ]
})
export class MyAdComponent implements OnInit {
  @Input() adSuccessfullySubmitted!: boolean;
  isBigScreen: boolean | undefined;
  windowSizeSubscription: Subscription;
  myAd: AdPostResponse | undefined;
  articlePictures: (string | undefined)[] = [];
  selectedPicNumber: number = 1;
  myOtherAds: AdPostResponse[] = [];
  showSeeMorBtn!: boolean
  adCount!: number

  constructor(
    private route: ActivatedRoute,
    private adService: AdService,
    private viewportScroller: ViewportScroller,
    private displayManagementService: DisplayManagementService
  ) {
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });
  }

  ngOnInit(): void {
    this.scrollToTop();
    const adId: number | null = Number(this.route.snapshot.paramMap.get(('id')));
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
        this.myAd = ad;
        this.articlePictures = [
          this.myAd.firstArticlePictureUrl,
          this.myAd.secondArticlePictureUrl,
          this.myAd.thirdArticlePictureUrl,
          this.myAd.fourthArticlePictureUrl,
          this.myAd.fifthArticlePictureUrl
        ].filter(url => !!url);
        this.selectedPicNumber = this.articlePictures.length;
        [this.areaSizeA, this.areaSizeB] = this.setSplitAreasSizes(this.articlePictures.length);
        // this.adService.findMyAds(this.myAd.publisherId!).subscribe({
        //   next: (myOtherAds: AdPostResponse[]) => {
        //     this.myOtherAds = myOtherAds.filter(ad => ad.id !== this.myAd!.id);
        //   }
        // })
        this.fetchPaginatedAdsList()
        this.adService.getMyAdsCount(1).subscribe({
          next: (adCount: number) => {
            this.adCount = adCount
            this.showSeeMorBtn = this.adCount > 9
            console.log('this.adCount:: ', this.adCount)
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

  // image carrousel for mobile device
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  togglePaused() {
    if (this.paused) {
      this.carousel!.cycle();
    } else {
      this.carousel!.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  @ViewChild('splitAreaA') splitAreaA!: SplitComponent
  @ViewChild('splitAreaB') splitAreaB!: SplitComponent

  areaSizeA!: number
  areaSizeB!: number
  sizesSAA = [30, 25, 15, 50]
  sizesSAB = [70, 75, 85, 50]
  sub!: Subscription

  setSplitAreasSizes(nPictures: number) {
    switch (nPictures) {
      case 3:
        return [this.sizesSAA[0], this.sizesSAB[0]]
      case 4:
        return [this.sizesSAA[1], this.sizesSAB[1]]
      case 5:
        return [this.sizesSAA[2], this.sizesSAB[2]]
      default:
        return [this.sizesSAA[3], this.sizesSAB[3]]
    }
  }

  test() { }

  pageNumber: number = 0;
  pageSize: number = 9;
  // displayedAds: AdPostResponse[] = [];
  noMoreAds: boolean = false;

  loadMoreAds() {
    this.pageNumber++;
    this.fetchPaginatedAdsList();
  }

  // TO DO :: à changer quand le processus de connexion sera implémenté
  fetchPaginatedAdsList() {
    this.adService.fetchMoreAds(1, this.pageNumber, this.pageSize).subscribe({
      next: (ads: AdPostResponse[]) => {
        this.myOtherAds = [...this.myOtherAds, ...ads];
        this.myOtherAds = this.myOtherAds.filter(ad => ad.id !== this.myAd!.id);
        this.noMoreAds = this.myOtherAds.length >= (this.adCount - 1)
        console.log('this.myOtherAds.length:: ', this.myOtherAds.length, 'this.adCount::', this.adCount)
        console.log('this.pageNumber ::', this.pageNumber, 'this.pageSize:: ', this.pageSize)
        console.log('myOtherAds')
        console.table(this.myOtherAds)
      }
    });
  }

  ngOnDestroy(): void {
    this.windowSizeSubscription.unsubscribe();
    if (this.sub) this.sub.unsubscribe()
  }
}
