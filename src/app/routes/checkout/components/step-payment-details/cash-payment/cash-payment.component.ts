import { Component } from '@angular/core';
import { BillingSummaryCardComponent } from '../billing-summary-card/billing-summary-card.component';

@Component({
  selector: 'app-cash-payment',
  standalone: true,
  imports: [BillingSummaryCardComponent],
  templateUrl: './cash-payment.component.html',
  styleUrl: './cash-payment.component.scss',
})
export class CashPaymentComponent {}
