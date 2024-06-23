import { Component } from '@angular/core';

@Component({
  selector: 'app-billing-summary-card',
  standalone: true,
  imports: [],
  templateUrl: './billing-summary-card.component.html',
  styleUrl: './billing-summary-card.component.scss',
})
export class BillingSummaryCardComponent {
  ad: any;
  sumTotal: number = 100;
}
