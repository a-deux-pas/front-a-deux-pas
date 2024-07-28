import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';
import { Router } from '@angular/router';

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
  ad: any;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkoutService.currentStep.subscribe((step) => {
      this.step = step;
      const recapDiv = document.getElementById('recap');
      if (recapDiv)
        if (this.step >= 2) recapDiv.onclick = () => this.returnToRecapPage();
        else recapDiv.onclick = null;

      const rdvDiv = document.getElementById('rdv');
      if (rdvDiv)
        if (this.step === 3) rdvDiv.onclick = () => this.returnToRdvPage();
        else rdvDiv.onclick = null;

      if (step === 2) this.ad = this.checkoutService.getCheckoutAd();
    });

    this.checkoutService.currentPaymentMethod.subscribe(
      (paymentMethod) => (this.paymentMethod = paymentMethod)
    );
  }

  returnToRecapPage() {
    this.checkoutService.updateStep(1);
    this.router.navigate(['/commander/recapitulatif']);
  }

  returnToRdvPage() {
    this.checkoutService.updateStep(2);
    this.router.navigate(['/commander/rdv']);
  }
}
