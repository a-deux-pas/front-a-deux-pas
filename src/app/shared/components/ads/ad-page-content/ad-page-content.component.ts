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
  @ViewChild('splitAreaA') splitAreaA!: SplitComponent
  @ViewChild('splitAreaB') splitAreaB!: SplitComponent
  onMyAd: boolean | undefined;
  currentAd: AdPostResponse | undefined;
  selectedPicNumber: number = 2;
  articlePictures: (string | undefined)[] = [];
  areaSizeA!: number
  areaSizeB!: number
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
    private displayManagementService: DisplayManagementService
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
        this.onMyAd = this.currentAd.publisherId == parseInt(localStorage.getItem('userId')!)
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
        if (!this.onMyAd) { this.maybeGetSimilarAds() }
        this.adService.getMyAdsCount(this.currentAd.publisherId!).subscribe({
          next: (adCount: number) => {
            this.adCount = adCount
            this.showSeeMorBtn = this.adCount > 9
          }
        })
      }
    });
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0])
  }

  maybeGetSimilarAds(): any {
    // TO DO : FAIRE EN SORTE (peut etre plutot dans le back que les annonces du current user n'apparaissent pas (?), ni la current Ad, ni les autres annonces de la currentAdPublisher)
    // Changer la méthode pour envoyer currentAd.publisherId au back pour que ses annonces en soient exclues
    console.log('this.currentAd!.category!:', this.currentAd!.category!)
    this.adService.getSimilarAds(this.currentAd!.category!).subscribe({
      next: (similarAds: AdPostResponse[]) => {
        console.table(similarAds)
        return this.similarAds = similarAds;
      }
    })
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

  fetchPaginatedAdsList() {
    this.pageSize = this.onMyAd == true ? 9 : 4;
    this.adService.fetchMoreAds(this.currentAd!.publisherId!, this.pageNumber, this.pageSize).subscribe({
      next: (ads: AdPostResponse[]) => {
        this.userOtherAds = [...this.userOtherAds, ...ads];
        this.userOtherAds = this.userOtherAds.filter(ad => ad.id !== this.currentAd!.id);
        this.noMoreAds = this.userOtherAds.length >= (this.adCount - 1) && this.adCount > 9
      }
    });
  }
}
