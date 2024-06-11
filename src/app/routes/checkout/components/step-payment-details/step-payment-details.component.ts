import { Component } from '@angular/core';
import { CheckoutService } from '../../checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-payment-details',
  standalone: true,
  imports: [],
  templateUrl: './step-payment-details.component.html',
  styleUrl: './step-payment-details.component.scss',
})
export class StepPaymentDetailsComponent {
  paymentMethod: string = '';
  step: number = 0;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkoutService.currentStep.subscribe((currentStep) => {
      if (currentStep !== 3) {
        this.router.navigate(['/checkout/recapitulatif']);
      }
      this.step = currentStep;
    });
    this.checkoutService.currentPaymentMethod.subscribe(
      (method) => (this.paymentMethod = method)
    );
  }
}
