import { Component } from '@angular/core';
import { BillingSummaryCardComponent } from '../billing-summary-card/billing-summary-card.component';
import { AdService } from '../../../../../shared/services/ad.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cash-payment',
  standalone: true,
  imports: [BillingSummaryCardComponent, FormsModule],
  templateUrl: './cash-payment.component.html',
  styleUrl: './cash-payment.component.scss',
})
export class CashPaymentComponent {
  articlePrice: number | null = null;

  constructor(private adService: AdService) {
    this.articlePrice = adService.getCheckoutAd().price;
    console.log(this.articlePrice);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      console.log('Form Submitted!', form);
    } else {
      console.log('Form is not valid');
    }
  }
}
