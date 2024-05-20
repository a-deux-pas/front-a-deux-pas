import { Component, Input } from '@angular/core';
import { AdPostResponse } from '../../../../shared/models/ad/ad-post-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-seller-ad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-seller-ad.component.html',
  styleUrl: './cta-seller-ad.component.scss'
})
export class CtaSellerAdComponent {
  @Input() myAd!: AdPostResponse | undefined
  @Input() isBigScreen!: boolean;
}
