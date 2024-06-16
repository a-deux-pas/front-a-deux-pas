import { Component } from '@angular/core';
import { BillingSummaryCardComponent } from '../billing-summary-card/billing-summary-card.component';

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [BillingSummaryCardComponent],
  templateUrl: './card-payment.component.html',
  styleUrl: './card-payment.component.scss',
})
export class CardPaymentComponent {}
