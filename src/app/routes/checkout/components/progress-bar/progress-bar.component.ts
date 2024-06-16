import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent implements OnInit {
  step!: number;
  paymentMethod: string = '';
  // replace with the received ad
  ad: any;

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit() {
    this.checkoutService.currentStep.subscribe((step) => (this.step = step));
    this.checkoutService.currentPaymentMethod.subscribe(
      (method) => (this.paymentMethod = method)
    );
  }
}
