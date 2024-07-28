import { Component } from '@angular/core';
import { BillingSummaryCardComponent } from '../billing-summary-card/billing-summary-card.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckoutService } from '../../../checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cash-payment',
  standalone: true,
  imports: [BillingSummaryCardComponent, FormsModule],
  templateUrl: './cash-payment.component.html',
  styleUrl: './cash-payment.component.scss',
})
export class CashPaymentComponent {
  articlePrice: number | null = null;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {
    this.articlePrice = this.checkoutService.getCheckoutAd().price;
  }

  onSubmit(form: NgForm) {
    this.checkoutService
      .proposeMeeting(this.checkoutService.getProposedMeeting())
      .subscribe((response: any) => {
        this.router.navigate(['/compte/rdv']);
      });
  }
}
