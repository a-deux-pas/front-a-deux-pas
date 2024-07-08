import { Component, Input } from '@angular/core';
import { AdDetails } from '../../../../../shared/models/ad/ad-details.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-my-ad',
  templateUrl: './cta-my-ad.component.html',
  styleUrl: './cta-my-ad.component.scss',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class CtaMyAdComponent {
  @Input() myAd!: AdDetails | undefined
  @Input() isBigScreen!: boolean;
}
