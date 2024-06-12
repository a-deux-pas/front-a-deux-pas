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

  step: number = 0;

  ngOnInit() {
    this.checkoutService.currentStep.subscribe((currentStep) => {
      this.step = currentStep;
    });
  }

  selectPaymentMethod(paymentMethod: string) {
    this.checkoutService.updatePaymentMethod(paymentMethod);
  }

  nextStep() {
    console.log('current step: ', this.step);
    this.checkoutService.updateStep(2);
    console.log('current step: ', this.step);

    setTimeout(() => {
      this.router.navigate(['/checkout/rdv']);
    }, 1000); // Delay to ensure state update
  }
}