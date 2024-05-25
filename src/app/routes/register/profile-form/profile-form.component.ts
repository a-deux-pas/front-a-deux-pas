import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { PreferredMeetingPlace } from '../../../shared/models/user/preferred-meeting-place.model';
import { alreadyExistValidator } from '../../../shared/utils/validators/already-exist-validators';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '../../../shared/components/schedule/schedule.component';
import { PreferredSchedule } from '../../../shared/models/user/preferred-schedule.model';
import { BankAccountFormComponent } from '../../../shared/components/bank-account-form/bank-account-form.component';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ScheduleComponent,BankAccountFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements OnInit, AfterViewInit {
  profileForm: FormGroup;

  preferredMeetingPlacesDisplay: PreferredMeetingPlace[] = [];
  isAddButtonClicked: boolean = true;
  preferredMeetingPlaceForm: FormGroup;

  scheduleEditMode: boolean = true;
  preferredSchedules: PreferredSchedule[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      profilePicture: ['', Validators.required],
      alias: ['', [Validators.required, Validators.minLength(3)]],
      bio: ['', Validators.minLength(10)],
      notification: [''],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required]
      }),
    });

    this.preferredMeetingPlaceForm = new FormGroup({
      name: new FormControl('', [Validators.required, alreadyExistValidator(this.preferredMeetingPlacesDisplay, 'name')]),
      street: new FormControl('', [Validators.required, alreadyExistValidator(this.preferredMeetingPlacesDisplay, 'street')]),
      postalCode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    });;
  }

  ngOnInit(): void {
  }

  // address-autofill
  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('mapbox-address-autofill');
    // Convertir NodeList en tableau
    const elementsArray = Array.from(elements);
    elementsArray.forEach((autofill: any) => {
      autofill.accessToken = environment.mapbox.accessToken;
    });
  }

  addPreferredMeetingPlace() {
    this.isAddButtonClicked = true;
    // add the preferred meeting place form to the profile Form
    this.profileForm.addControl('preferredMeetingPlace', this.preferredMeetingPlaceForm);
    if (this.preferredMeetingPlaceForm.valid) {
      // save the form value for display
      this.preferredMeetingPlacesDisplay.push(this.preferredMeetingPlaceForm.value);
      // reset the form and remove controls
      this.deletePreferredMeetingPlaceForm();
    }
  }

  deletePreferredMeetingPlace(meetingPlaceIndex: number) {
    this.preferredMeetingPlacesDisplay.splice(meetingPlaceIndex, 1);
  }

  deletePreferredMeetingPlaceForm() {
    this.preferredMeetingPlaceForm.reset();
    this.isAddButtonClicked = false;
    this.profileForm.removeControl('preferredMeetingPlace');
  }

  getUserPreferredSchedules(newPreferredSchedules: PreferredSchedule[]) {
    this.preferredSchedules = newPreferredSchedules;
  }

  // Form Submit
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  // TO DO :
  // - differenciation autocomplétion ?
  // - composant informations bancaires
  // - tester si l'on peut refactoriser avec le meeting place component du profil
  // - tenter de refactoriser le form
}
