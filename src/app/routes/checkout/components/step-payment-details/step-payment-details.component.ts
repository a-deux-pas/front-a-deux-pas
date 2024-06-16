import { Component } from '@angular/core';
import { CheckoutService } from '../../checkout.service';
import { Router } from '@angular/router';
import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { CardPaymentComponent } from './card-payment/card-payment.component';

@Component({
  selector: 'app-step-payment-details',
  standalone: true,
  imports: [CashPaymentComponent, CardPaymentComponent],
  templateUrl: './step-payment-details.component.html',
  styleUrl: './step-payment-details.component.scss',
})
export class StepPaymentDetailsComponent {
  paymentMethod!: string;
  step!: number;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.checkoutService.currentStep.subscribe((currentStep) => {
      if (currentStep !== 3) {
        this.router.navigate(['/checkout/recapitulatif']);
      }
      this.step = currentStep;
    });
    this.checkoutService.currentPaymentMethod.subscribe((method) => {
      this.paymentMethod = method;
    });
  }
}
