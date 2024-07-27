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
    console.log(this.articlePrice);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.checkoutService
      .proposeMeeting(this.checkoutService.getProposedMeeting())
      .subscribe((response: any) => {
        console.log('response : ', response);
        this.router.navigate(['/compte/rdv']);
      });
  }
}
