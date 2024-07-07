import { Component } from '@angular/core';
import { AdService } from '../../../../../shared/services/ad.service';

@Component({
  selector: 'app-billing-summary-card',
  standalone: true,
  imports: [],
  templateUrl: './billing-summary-card.component.html',
  styleUrl: './billing-summary-card.component.scss',
})
export class BillingSummaryCardComponent {
  ad: any;

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ad = this.adService.getCheckoutAd();
  }
}
