import { Component } from '@angular/core';
import { CheckoutService } from '../../../checkout.service';

@Component({
  selector: 'app-billing-summary-card',
  standalone: true,
  imports: [],
  templateUrl: './billing-summary-card.component.html',
  styleUrl: './billing-summary-card.component.scss',
})
export class BillingSummaryCardComponent {
  ad: any;

  constructor(private checkoutservice: CheckoutService) {}

  ngOnInit() {
    this.ad = this.checkoutservice.getCheckoutAd();
  }
}
