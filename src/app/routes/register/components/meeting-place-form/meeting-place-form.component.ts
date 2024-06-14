import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, OnInit, Output, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { PreferredMeetingPlace } from '../../../../shared/models/user/preferred-meeting-place.model';
import { environment } from '../../../../../environments/environment';
import { alreadyExistValidator } from '../../../../shared/utils/validators/custom-validators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-meeting-place-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './meeting-place-form.component.html',
  styleUrl: './meeting-place-form.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class MeetingPlaceFormComponent implements OnInit {
  preferredMeetingPlaceForm!: FormGroup;
  preferredMeetingPlacesDisplay: PreferredMeetingPlace[] = [];
  isAddButtonClicked: boolean = true;
  @Output() addPreferredMeetingPlaces = new EventEmitter<PreferredMeetingPlace[]>();

  constructor(public profileForm: FormGroupDirective, private sanitizer: DomSanitizer,) {}

  // address-autofill - TO DO : voir si possible de tranférer la méthode dans un service
  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('mapbox-address-autofill');
    // Convertir NodeList en tableau
    const elementsArray = Array.from(elements);
    elementsArray.forEach((autofill: any) => {
      autofill.accessToken = environment.mapbox.accessToken;
    });
  }

  ngOnInit() {
    this.preferredMeetingPlaceForm = this.profileForm.form;
    this.addPreferredMeetingPlaceFormGroup();
  }

  addPreferredMeetingPlaceFormGroup() {
    const group = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        alreadyExistValidator(this.preferredMeetingPlacesDisplay, 'name')
      ]),
      street: new FormControl('', [Validators.required, alreadyExistValidator(this.preferredMeetingPlacesDisplay, 'street')]),
      postalCode: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      city: new FormControl('', Validators.required),
      userId: new FormControl(localStorage.getItem('userId'))
    });
    this.preferredMeetingPlaceForm.addControl('preferredMeetingPlace', group);
  }

  get preferredMeetingPlaceFormGroup(): FormGroup {
    return this.preferredMeetingPlaceForm.get('preferredMeetingPlace') as FormGroup;
  }

  addPreferredMeetingPlace() {
    this.isAddButtonClicked = true;
    this.addPreferredMeetingPlaceFormGroup();

    if (this.preferredMeetingPlaceFormGroup.valid) {
      // Sanitize values before pushing to preferredMeetingPlacesDisplay
      const sanitizedMeetingPlace = {
        name: this.sanitizer.sanitize(SecurityContext.HTML, this.preferredMeetingPlaceFormGroup.get('name')?.value) ?? '',
        street: this.sanitizer.sanitize(SecurityContext.HTML, this.preferredMeetingPlaceFormGroup.get('street')?.value) ?? '',
        postalCode: this.sanitizer.sanitize(SecurityContext.HTML, this.preferredMeetingPlaceFormGroup.get('postalCode')?.value) ?? '',
        city: this.sanitizer.sanitize(SecurityContext.HTML, this.preferredMeetingPlaceFormGroup.get('city')?.value) ?? '',
        userId: this.preferredMeetingPlaceFormGroup.get('userId')?.value
      };

      // save the form value for display
      this.preferredMeetingPlacesDisplay.push(sanitizedMeetingPlace);
      this.addPreferredMeetingPlaces.emit(this.preferredMeetingPlacesDisplay);
      // reset the form and remove controls
      this.deletePreferredMeetingPlaceForm();
    }
  }

  deletePreferredMeetingPlace(meetingPlaceIndex: number) {
    this.preferredMeetingPlacesDisplay.splice(meetingPlaceIndex, 1);
    this.addPreferredMeetingPlaces.emit(this.preferredMeetingPlacesDisplay);
  }

  deletePreferredMeetingPlaceForm() {
    this.isAddButtonClicked = false;
    this.preferredMeetingPlaceFormGroup.reset();
    this.preferredMeetingPlaceForm.removeControl('preferredMeetingPlace');
  }
}
