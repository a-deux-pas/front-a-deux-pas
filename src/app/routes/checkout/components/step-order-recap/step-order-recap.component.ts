import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../../checkout.service';
import { OrderRecapCardComponent } from './order-recap-card/order-recap-card.component';

@Component({
  selector: 'app-step-order-recap',
  standalone: true,
  imports: [OrderRecapCardComponent],
  templateUrl: './step-order-recap.component.html',
  styleUrl: './step-order-recap.component.scss',
})
export class StepOrderRecapComponent implements OnInit {
  constructor(
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  step!: number;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.checkoutService.currentStep.subscribe((currentStep) => {
      console.log('inside recap, on init, step is ', currentStep);
      this.step = currentStep;
    });
    // Find the initially checked radio button and run the corresponding method
    const checkedRadio = document.querySelector(
      'input[name="payment"]:checked'
    ) as HTMLInputElement;
    if (checkedRadio) {
      this.selectPaymentMethod(checkedRadio.id);
    }
  }

  selectPaymentMethod(paymentMethod: string) {
    this.checkoutService.updatePaymentMethod(paymentMethod);
  }

  nextStep() {
    this.checkoutService.updateStep(2);
    this.router.navigate(['/checkout/rdv']);
  }
}
