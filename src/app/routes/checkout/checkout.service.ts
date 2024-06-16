import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private stepSource = new BehaviorSubject<number>(1);
  currentStep = this.stepSource.asObservable();

  private paymentMethodSource = new BehaviorSubject<string>('');
  currentPaymentMethod = this.paymentMethodSource.asObservable();

  updateStep(step: number) {
    this.stepSource.next(step);
  }

  updatePaymentMethod(paymentMethod: string) {
    this.paymentMethodSource.next(paymentMethod);
  }
}
