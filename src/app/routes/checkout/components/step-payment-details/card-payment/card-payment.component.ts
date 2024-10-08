import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { environment } from '../../../../../../environments/environment.dev';
import { CheckoutService } from '../../../checkout.service';
import { Router } from '@angular/router';
import { BillingSummaryCardComponent } from '../billing-summary-card/billing-summary-card.component';
import { catchError, finalize, of } from 'rxjs';
import { ALERTS } from '../../../../../shared/utils/constants/alert-constants';
import { DisplayManagementService } from '../../../../../shared/services/display-management.service';
import { MeetingService } from '../../../../account/meetings/meeting.service';

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [BillingSummaryCardComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss'],
})
export class CardPaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;

  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;

  style = {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#cff1ef', // our $tertiary
      },
    },
    invalid: {
      color: '#ff9f1a', // our $primary
    },
  };

  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private router: Router,
    private displayManagementService: DisplayManagementService,
    private meetingService: MeetingService
  ) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardExpiry: ['', Validators.required],
      cardCvc: ['', Validators.required],
      conditions: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {
    this.initializeStripe();
  }

  async initializeStripe() {
    this.stripe = await loadStripe(environment.stripeToken);
    if (this.stripe) {
      this.elements = this.stripe.elements();

      this.cardNumber = this.elements.create('cardNumber', {
        style: this.style,
      });
      this.cardExpiry = this.elements.create('cardExpiry', {
        style: this.style,
      });
      this.cardCvc = this.elements.create('cardCvc', { style: this.style });

      this.cardNumber.mount('#card-number-element');
      this.cardExpiry.mount('#card-expiry-element');
      this.cardCvc.mount('#card-cvc-element');

      this.addEventListeners();
    }
  }

  addEventListeners() {
    this.cardNumber.on('change', (event: any) => {
      if (event.error) {
        this.paymentForm
          .get('cardNumber')
          ?.setErrors({ stripe: event.error.message });
      } else {
        this.paymentForm.get('cardNumber')?.setErrors(null);
      }
    });

    this.cardExpiry.on('change', (event: any) => {
      if (event.error) {
        this.paymentForm
          .get('cardExpiry')
          ?.setErrors({ stripe: event.error.message });
      } else {
        this.paymentForm.get('cardExpiry')?.setErrors(null);
      }
    });

    this.cardCvc.on('change', (event: any) => {
      if (event.error) {
        this.paymentForm
          .get('cardCvc')
          ?.setErrors({ stripe: event.error.message });
      } else {
        this.paymentForm.get('cardCvc')?.setErrors(null);
      }
    });
  }

  async proposeMeeting() {
    if (this.paymentForm.invalid) {
      return;
    }

    this.checkoutService
      .proposeMeeting(this.meetingService.getMeeting())
      .pipe(
        catchError((error) => {
          console.error('Error while initializing the meeting', error);
          this.displayManagementService.displayAlert(ALERTS.DEFAULT_ERROR);
          return of(null);
        }),
        finalize(() => {
          this.router.navigate(['/compte/rdv']);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          this.displayManagementService.displayAlert(
            ALERTS.MEETING_INITIALIZED_SUCCESS
          );
          // create payment intent immediately after the meeting is successfully created
          this.createPaymentIntent(response);
          this.meetingService.getMeeting()!.meetingId =
            response.meetingId;
        }
        this.router.navigate(['/compte/rdv']);
      });
  }

  async createPaymentIntent(response: any) {
    if (!this.stripe || !this.cardNumber || !this.cardExpiry || !this.cardCvc) {
      return;
    }

    const { token, error } = await this.stripe.createToken(this.cardNumber, {
      name: this.paymentForm.value.name,
    });

    if (error) {
      console.error('Error creating token:', error);
      return;
    }

    this.checkoutService
      // pass the meetign id received inside the response object, atfter meeting creation
      .createPaymentIntent(token, response.meetingId)
      .subscribe((response) => {
        console.log('Payment intent created:', response);
        // confirm the created payment intent, using the Stripe client secret sent by our back end
        this.stripe
          ?.confirmCardPayment(response.clientSecret)
          .then((result) => {
            if (result.error) {
              console.error(
                'Error confirming card payment intent:',
                result.error
              );
            } else {
              console.log(
                'Card payment intent confirmed:',
                result.paymentIntent
              );
            }
          });
      });
  }
}
