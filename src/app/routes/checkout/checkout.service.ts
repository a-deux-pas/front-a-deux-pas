import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private stepSource = new BehaviorSubject<number>(1);
  currentStep = this.stepSource.asObservable();

  private paymentMethodSource = new BehaviorSubject<string>('cash'); // Default to 'cash'
  currentPaymentMethod = this.paymentMethodSource.asObservable();

  updateStep(step: number) {
    setTimeout(() => {
      this.stepSource.next(step);
      console.log('inside timeout, inside service, step is', step);
    }, 1000); // Delay to ensure state update
  }

  updatePaymentMethod(paymentMethod: string) {
    this.paymentMethodSource.next(paymentMethod);
  }
}
