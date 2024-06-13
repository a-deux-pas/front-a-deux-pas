import { Component, NgModule, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-meeting-details',
  standalone: true,
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './step-meeting-details.component.html',
  styleUrl: './step-meeting-details.component.scss',
})
export class StepMeetingDetailsComponent implements OnInit {
  step: number = 0;
  agreedToTerms: boolean = false;

  // replace with the received ad
  ad: any;
  // replace with ad.publisher.preferredMeetingPlaces
  meetingPlaces = [
    { id: 1, name: 'First address' },
    { id: 2, name: 'Second Address' },
    { id: 3, name: 'Third Address' },
    { id: 4, name: 'Fourth Address' },
    { id: 5, name: 'Fifth Address' },
  ];
  selectedMeetingPlace!: any;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Just entered rdv onInit(), current step is ', this.step);
    this.checkoutService.currentStep.subscribe((currentStep) => {
      console.log('Before if(). current step is ', currentStep);
      /*if (currentStep !== 2) {
        this.router.navigate(['/checkout/recapitulatif']);
      }*/
      this.step = currentStep;
    });
    console.log('Preparing to exit rdv onInit(), current step is ', this.step);
  }

  agreeToTerms() {
    this.agreedToTerms = true;
  }

  nextStep() {
    console.log('current step: ', this.step);
    this.checkoutService.updateStep(3);
    console.log('current step: ', this.step);

    setTimeout(() => {
      this.router.navigate(['/checkout/paiement']);
    }, 1000); // Delay to ensure state update
  }
}
