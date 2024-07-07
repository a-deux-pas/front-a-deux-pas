import { Component, NgModule, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimeIntervalPickerComponent } from './time-interval-picker/time-interval-picker.component';
import { AdService } from '../../../../shared/services/ad.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-step-meeting-details',
  standalone: true,
  imports: [
    NgSelectModule,
    FormsModule,
    CommonModule,
    DatePickerComponent,
    TimeIntervalPickerComponent,
  ],
  templateUrl: './step-meeting-details.component.html',
  styleUrl: './step-meeting-details.component.scss',
})
export class StepMeetingDetailsComponent implements OnInit {
  step!: number;
  agreedToTerms: boolean = false;
  ad: any;
  user: any;
  selectedMeetingPlace!: any;
  meetingPlaces: any;
  schedule: any;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private adService: AdService,
    private userService: UserService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.checkoutService.currentStep.subscribe((currentStep) => {
      if (currentStep < 2) {
        this.router.navigate(['/checkout/recapitulatif']);
      }
      this.step = currentStep;
    });
    this.ad = this.adService.getCheckoutAd();
    this.userService
      .fetchUserByAlias(this.ad.publisherAlias)
      .subscribe((user: any) => {
        this.user = user;
        this.meetingPlaces = this.user.preferredMeetingPlaces;
        this.schedule = this.user.preferredSchedules;
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
