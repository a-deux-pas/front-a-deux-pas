import { Component, HostListener, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdService } from '../../../Ad.service';
import { AdPostResponse } from '../../../../shared/models/ad/adPostResponse.model';
import { NgbCarousel, NgbCarouselModule, NgbNavModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AdCardComponent } from '../../../../shared/components/ads/ad-card/ad-card.component';

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
  ]
})
export class MyAdComponent implements OnInit {
  isBigScreen: boolean | undefined
  @Input() adSuccessfullySubmitted!: boolean;
  myAd: AdPostResponse | undefined;
  articlePictures: (string | undefined)[] = [];
  selectedPicNumber: number = 1;
  myOtherAds: AdPostResponse[] = []

  //TODO : to probably put in some utils service
  // This HostListener listens for window resize events
  // When a resize event occurs, the onResize method is triggered
  // It takes the event object as a parameter
  // The isBigScreen property is updated based on the inner width of the event target
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // If the inner width is greater than 1200 pixels, isBigScreen is set to true, otherwise false
    this.isBigScreen = window.innerWidth > 1200;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adService: AdService) {

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
            console.log("myotherAds")
            console.table(this.myOtherAds)
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

  goToMyAdPage(adId: number) {
    this.router.navigate(['compte/annonce/mon-annonce/', adId])
  }
}

