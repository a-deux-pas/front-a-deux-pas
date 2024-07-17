import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout.service';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimeIntervalPickerComponent } from './time-interval-picker/time-interval-picker.component';
import { AdService } from '../../../../shared/services/ad.service';
import { UserService } from '../../../../shared/services/user.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BuyerProposedMeetingRequest } from '../../../../shared/models/meeting/buyer-proposed-meeting-request.model';

@Component({
  selector: 'app-step-meeting-details',
  standalone: true,
  imports: [
    NgSelectModule,
    FormsModule,
    CommonModule,
    DatePickerComponent,
    ReactiveFormsModule,
    TimeIntervalPickerComponent,
  ],
  templateUrl: './step-meeting-details.component.html',
  styleUrl: './step-meeting-details.component.scss',
})
export class StepMeetingDetailsComponent implements OnInit {
  form: FormGroup;
  step!: number;
  agreedToTerms: boolean = false;

  ad: any;
  seller: any;
  proposedMeeting: BuyerProposedMeetingRequest | null = null;
  meetingPlaces: any;
  preferredSchedules: any;

  /* buyerDistinctiveSign: string | null = null;
  sellerDistinctiveSign: string | null = null;
  selectedMeetingPlace: string | null = null;*/
  selectedTime: string | null = null;
  selectedDate: NgbDateStruct | undefined;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private adService: AdService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      meetingPlace: [null, Validators.required],
      sign: [null],
      info: [null],
      selectedDate: [Validators.required],
      selectedTime: [null, Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {
    console.log('selected date in meeting detail', this.selectedDate);
    window.scrollTo(0, 0);
    this.checkoutService.currentStep.subscribe((currentStep) => {
      if (currentStep < 2) {
        this.router.navigate(['/checkout/recapitulatif']);
      }
      this.step = currentStep;
    });
    this.ad = this.adService.getCheckoutAd();
    this.seller = this.userService.getCheckoutSeller();
    this.meetingPlaces = this.seller.preferredMeetingPlaces;
    this.preferredSchedules = this.seller.preferredSchedules;
  }

  onDateSelected(date: NgbDateStruct) {
    this.form.get('selectedDate')?.setValue(date);
    this.form.get('selectedTime')?.setValue(null);
    this.selectedDate = date;
  }

  onTimeSelected(timeInterval: string) {
    this.form.get('selectedTime')?.setValue(timeInterval);
    this.selectedTime = timeInterval;
  }

  agreeToTerms() {
    const currentTermsValue = this.form.get('terms')?.value;
    this.form.get('terms')?.patchValue(!currentTermsValue);
    console.log(this.form);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form);
      this.checkoutService.updateStep(3);
      // TODO : save meeting state to service

      this.router.navigate(['/checkout/paiement']);
    }
  }
}
