import { Component, OnInit } from '@angular/core';
import { Ad } from '../../../../../../model/ad.model';
import { ActivatedRoute } from '@angular/router';
import { AdService } from '../../../../../shared/components/ads/ad-form/Ad.service';

@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  styleUrl: './my-ad.component.scss'
})
export class MyAdComponent implements OnInit {
  myAd!: Ad;

  constructor(
    private route: ActivatedRoute,
    private adService: AdService) { }

  ngOnInit(): void {
    const adId: number | null = Number(this.route.snapshot.paramMap.get(('id')));
    this.adService.findAdById(adId).subscribe({
      next: (ad: Ad) => {
        this.myAd = ad;
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
