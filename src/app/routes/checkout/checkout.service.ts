import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { MeetingRequest } from '../../shared/models/meeting/meeting-request.model';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import {
  MEETING_BASE_URL,
  PAYMENT_BASE_URL,
} from '../../shared/utils/constants/util-constants';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private stepSource = new BehaviorSubject<number>(1);
  currentStep = this.stepSource.asObservable();

  private paymentMethodSource = new BehaviorSubject<string>('');
  currentPaymentMethod = this.paymentMethodSource.asObservable();

  private checkoutAd: any;
  private checkoutSeller: any;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  updateStep(step: number) {
    this.stepSource.next(step);
  }

  updatePaymentMethod(paymentMethod: string) {
    this.paymentMethodSource.next(paymentMethod);
  }

  // Ad state management methods
  setCheckoutAd(ad: any): void {
    this.checkoutAd = ad;
  }

  getCheckoutAd(): any {
    return this.checkoutAd;
  }

  // Seller state management methods
  setCheckoutseller(seller: any): void {
    this.checkoutSeller = seller;
  }

  getCheckoutSeller(): any {
    return this.checkoutSeller;
  }

  proposeMeeting(
    proposedMeeting: MeetingRequest | null
  ): Observable<MeetingRequest> {
    return this.http
      .post<MeetingRequest>(
        `${MEETING_BASE_URL}/initialize`,
        proposedMeeting
      )
      .pipe(catchError(this.handleErrorService.handleError));
  }

  createPaymentIntent(token: any, meetingId: any): Observable<any> {
    return this.http
      .post<any>(`${PAYMENT_BASE_URL}/create-payment-intent`, {
        amount: this.getCheckoutAd().price * 100, // initial amount is in cents
        currency: 'eur',
        type: 'card',
        token: token.id,
        meetingId: meetingId,
      })
      .pipe(catchError(this.handleErrorService.handleError));
  }
}
