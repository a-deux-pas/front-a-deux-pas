import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-meeting-details',
  standalone: true,
  imports: [],
  templateUrl: './step-meeting-details.component.html',
  styleUrl: './step-meeting-details.component.scss',
})
export class StepMeetingDetailsComponent implements OnInit {
  step: number = 0;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Just entered rdv onInit(), current step is ', this.step);
    this.checkoutService.currentStep.subscribe((currentStep) => {
      console.log('Before if(). current step is ', currentStep);
      if (currentStep !== 2) {
        this.router.navigate(['/checkout/recapitulatif']);
      }
      this.step = currentStep;
    });
    console.log('Preparing to exit rdv onInit(), current step is ', this.step);
  }
}
