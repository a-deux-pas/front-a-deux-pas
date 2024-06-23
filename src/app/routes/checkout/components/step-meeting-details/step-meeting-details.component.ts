import { Component, NgModule, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';

@Component({
  selector: 'app-step-meeting-details',
  standalone: true,
  imports: [NgSelectModule, FormsModule, CommonModule, DatePickerComponent],
  templateUrl: './step-meeting-details.component.html',
  styleUrl: './step-meeting-details.component.scss',
})
export class StepMeetingDetailsComponent implements OnInit {
  step!: number;
  agreedToTerms: boolean = false;
  // replace with the received ad
  ad: any;
  selectedMeetingPlace!: any;
  // replace with ad.publisher.preferredMeetingPlaces
  meetingPlaces = [
    { id: 1, name: 'First address' },
    { id: 2, name: 'Second Address' },
    { id: 3, name: 'Third Address' },
    { id: 4, name: 'Fourth Address' },
    { id: 5, name: 'Fifth Address' },
  ];

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.checkoutService.currentStep.subscribe((currentStep) => {
      if (currentStep < 2) {
        this.router.navigate(['/checkout/recapitulatif']);
      }
      this.step = currentStep;
    });
  }

  agreeToTerms() {
    this.agreedToTerms = true;
  }

  nextStep() {
    this.checkoutService.updateStep(3);
    this.router.navigate(['/checkout/paiement']);
  }
}
