import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from '../../../Ad.service';
import { AdPostResponse } from '../../../../shared/models/ad/adPostResponse.model';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AdFormComponent } from '../../../../shared/components/ads/ad-form/ad-form.component';


@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  styleUrl: './my-ad.component.scss',
  standalone: true,
  imports: [
    NgbNavModule,
    NgbCarouselModule,
    CommonModule,
    AdFormComponent
  ]
})
export class MyAdComponent implements OnInit {
  myAd: AdPostResponse | undefined;
  articlePictures: (string | undefined)[] = [];
  selectedPicNumber: number = 1;

  constructor(
    private route: ActivatedRoute,
    private adService: AdService) { }

  ngOnInit(): void {
    const adId: number | null = Number(this.route.snapshot.paramMap.get(('id')));
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
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
