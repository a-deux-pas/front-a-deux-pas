import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../../checkout.service';
import { OrderRecapCardComponent } from './order-recap-card/order-recap-card.component';
import { UserService } from '../../../../shared/services/user.service';
import { Seller } from '../../../../shared/models/user/checkout-seller.model';

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
    private checkoutService: CheckoutService,
    private userService: UserService
  ) {}

  ad: any;
  seller: Seller | undefined;
  step!: number;

  ngOnInit() {
    this.ad = this.checkoutService.getCheckoutAd();
    if (!this.ad) {
      this.router.navigate(['']);
    }
    window.scrollTo(0, 0);
    this.checkoutService.currentStep.subscribe((currentStep) => {
      this.step = currentStep;
    });
    this.userService
      .fetchUserByAlias(this.ad.publisherAlias)
      .subscribe((seller: Seller) => {
        this.seller = seller;
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

  returnToAdDetails() {
    this.router.navigate([`/annonce/${this.seller?.id}/${this.ad?.id}`]);
  }

  nextStep() {
    this.checkoutService.updateStep(2);
    this.checkoutService.setCheckoutseller(this.seller);
    this.router.navigate(['/checkout/rdv']);
  }
}
