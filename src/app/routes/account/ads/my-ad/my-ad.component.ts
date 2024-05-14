import { ActivatedRoute } from '@angular/router';
import { AdService } from '../../../Ad.service';
import { AdPostResponse } from '../../../../shared/models/ad/ad-post-response.model';
import { NgbCarousel, NgbCarouselModule, NgbNavModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AdCardComponent } from '../../../../shared/components/ads/ad-card/ad-card.component';
import { DisplayManagementService } from '../../../../shared/services/display-management.service';
import { Component, ChangeDetectionStrategy, ViewChild, HostBinding, OnInit, Input } from '@angular/core'
import { Subscription, merge } from 'rxjs'
import { map } from 'rxjs/operators'
import { SplitComponent } from 'angular-split'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../../../shared/module/ui/ui.module';



@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  styleUrl: './my-ad.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  isBigScreen: boolean | undefined
  @Input() adSuccessfullySubmitted!: boolean;
  myAd: AdPostResponse | undefined;
  articlePictures: (string | undefined)[] = [];
  selectedPicNumber: number = 1;
  myOtherAds: AdPostResponse[] = []
  windowSizeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private adService: AdService,
    private displayManagementService: DisplayManagementService
  ) {
    this.windowSizeSubscription = this.displayManagementService.isBigScreen$.subscribe(isBigScreen => {
      this.isBigScreen = isBigScreen;
    });
  }

  ngOnInit(): void {
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
        this.adService.findMyAds(this.myAd.publisherId!).subscribe({
          next: (myOtherAds: AdPostResponse[]) => {
            this.myOtherAds = myOtherAds.filter(ad => ad.id !== this.myAd!.id);
          }
        })
      },
      error: error => {
        console.error(error);
      }
    });
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

  pageNumber: number = 0;

  // fetchCitiesAndPostalCodes() {
  //   this.adService
  //     .fetchCitiesAndPostalCodes()
  //     .subscribe((citiesAndPostalCodes: any) => {
  //       this.formatCitiesAndPostalCodesForDisplay(citiesAndPostalCodes);
  //     });
  // }

  // fetchPaginatedAdsList() {
  //   this.adService
  //     .fetchFilteredAds(
  //       this.pageNumber,
  //       this.pageSize,
  //       1
  //     )
  //     .subscribe((ads: AdResponse[]) => {
  //       this.displayedAds = [...this.displayedAds, ...ads];
  //       this.noMoreAds = ads.length > 0 ? false : true;
  //     });
  // }

  // loadMoreAds() {
  //   this.pageNumber++;
  //   this.fetchPaginatedAdsList();
  // }

  @ViewChild('splitAreaA') splitAreaA!: SplitComponent
  @ViewChild('splitAreaB') splitAreaB!: SplitComponent
  // @ViewChild('mySplitC') mySplitCEl!: SplitComponent
  //@HostBinding('class') class = 'split-example-page';

  sizes = [25, 75]
  sub!: Subscription


  test() { }

  ngOnDestroy(): void {
    this.windowSizeSubscription.unsubscribe();
    if (this.sub) this.sub.unsubscribe()
  }
}
