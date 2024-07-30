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
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BuyerProposedMeetingRequest } from '../../../../shared/models/meeting/buyer-proposed-meeting-request.model';
import { format } from 'date-fns';

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
  proposedMeeting: BuyerProposedMeetingRequest | undefined;
  meetingPlaces: any;
  preferredSchedules: any;

  selectedDate: NgbDateStruct | undefined;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      meetingPlace: [null, Validators.required],
      sign: [null, [Validators.minLength(5), Validators.maxLength(600)]],
      info: [null, [Validators.minLength(5), Validators.maxLength(600)]],
      selectedDate: [Validators.required],
      selectedTime: [null, Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.checkoutService.currentStep.subscribe((currentStep) => {
      if (currentStep < 2) {
        this.router.navigate(['/checkout/recapitulatif']);
      }
      this.step = currentStep;
    });
    this.ad = this.checkoutService.getCheckoutAd();
    this.seller = this.checkoutService.getCheckoutSeller();
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
  }

  onSubmit() {
    if (this.form.valid) {
      this.checkoutService.updateStep(3);
      this.saveProposedMeetingToService();
      this.router.navigate(['/commander/paiement']);
    } else {
      console.error('Invalid Form');
    }
  }

  private saveProposedMeetingToService() {
    const localStorageId = localStorage.getItem('userId');
    const buyerId = localStorageId ? +localStorageId : -1;
    const proposedMeetingPlaceId = this.form.get('meetingPlace')?.value.id;
    const selectedDate = this.form.get('selectedDate')?.value;
    const proposedDate: Date = new Date();
    proposedDate.setFullYear(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.day
    );
    const buyerAdditionalInfo = this.form.get('info')?.value;
    const buyerDistinctiveSign = this.form.get('sign')?.value;
    this.addHoursAndMinutes(proposedDate);

    // Format the date manually to the string format expected by Spring's LocalDateTime type, to avoid a backend parse error,
    // ( without using the toISOString() that sets the absolute UTC time, and subtracts 2 hours in our case)
    const formattedDate = format(proposedDate, "yyyy-MM-dd'T'HH:mm:ss");

    this.proposedMeeting = new BuyerProposedMeetingRequest(
      buyerId,
      this.seller.id,
      this.ad.id,
      proposedMeetingPlaceId,
      formattedDate,
      buyerAdditionalInfo,
      buyerDistinctiveSign
    );
    this.checkoutService.setProposedMeeting(this.proposedMeeting);
  }

  private addHoursAndMinutes(proposedDate: Date) {
    const selectedTime = this.form.get('selectedTime')?.value;

    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(' : ').map(Number);
      proposedDate.setHours(hours);
      proposedDate.setMinutes(minutes);
    } else {
      console.error('Selected time is undefined');
    }
  }
}
