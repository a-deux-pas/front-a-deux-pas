import { Component, Input, OnInit } from '@angular/core';
import { AdDetails } from '../../../../../shared/models/ad/ad-details.model';
import { CommonModule } from '@angular/common';
import { CtaMyAdService } from './cta-my-ad.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cta-my-ad',
  templateUrl: './cta-my-ad.component.html',
  styleUrl: './cta-my-ad.component.scss',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class CtaMyAdComponent implements OnInit {
  @Input() myAd!: AdDetails | undefined;
  @Input() isBigScreen!: boolean;
  favCount!: number;
  adId!: number;

  constructor(
    private ctaMyAdService: CtaMyAdService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.adId = +params['adId']
    })
    this.ctaMyAdService.getFavoriteCount(this.adId).subscribe(favCount =>
      this.favCount = favCount)
  }
}
