import { Component } from '@angular/core';
import { BillingSummaryCardComponent } from '../billing-summary-card/billing-summary-card.component';
import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeElements,
} from '@stripe/stripe-js';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [BillingSummaryCardComponent, ReactiveFormsModule],
  templateUrl: './card-payment.component.html',
  styleUrl: './card-payment.component.scss',
})
export class CardPaymentComponent {
  form: FormGroup;
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      confirm: [false, Validators.requiredTrue],
    });
  }

  async ngOnInit() {
    this.stripe = await loadStripe(
      'pk_test_51PehXqRqo0EYMuWs8RGL5PO2Rg5A6tIa1qPWgbDJsQtSvVDwXWEd7zRnrlcbKWs3RHdgDnkUYYxiAnk9GQosL17u006yqaLH8s'
    );

    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async pay() {
    if (this.form.valid && this.stripe && this.card) {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
        billing_details: {
          name: this.form.get('name')?.value,
        },
      });

      if (error) {
        console.error(error);
      } else {
        this.http
          .post<{ clientSecret: string }>(
            'http://localhost:8080/api/payment/create-payment-intent',
            {
              paymentMethod: paymentMethod.id,
            }
          )
          .subscribe(async (data) => {
            const result = await this.stripe?.confirmCardPayment(
              data.clientSecret,
              {
                payment_method: paymentMethod.id,
              }
            );

            if (result?.error) {
              console.error(result.error.message);
            } else if (result?.paymentIntent.status === 'succeeded') {
              console.log('Payment successful');
            }
          });
      }
    } else console.error('nope : ');

    console.log(this.form.valid, this.stripe, this.card);
  }
}
