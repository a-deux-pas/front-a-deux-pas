import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from '../../../../shared/services/Ad.service';
import { AdResponse } from '../../../../../model/adResponse.model';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  styleUrl: './my-ad.component.scss'
})
export class MyAdComponent implements OnInit {
  isBigScreen: boolean | undefined

  myAd: AdResponse | undefined;
  articlePictures: (string | undefined)[] = [];
  selectedPicNumber: number = 1;

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
    private adService: AdService) { }

  ngOnInit(): void {
    const adId: number | null = Number(this.route.snapshot.paramMap.get(('id')));
    this.adService.findAdById(adId).subscribe({
      next: (ad: AdResponse) => {
        this.myAd = ad;
        this.articlePictures = [
          this.myAd.firstArticlePictureUrl,
          this.myAd.secondArticlePictureUrl,
          this.myAd.thirdArticlePictureUrl,
          this.myAd.fourthArticlePictureUrl,
          this.myAd.fifthArticlePictureUrl
        ].filter(url => !!url);
        this.selectedPicNumber = this.articlePictures.length;

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

  goToMyAdPage(adId: Number) {
    this.router.navigate(['compte/annonce/mon-annonce/', adId])
  }
}

