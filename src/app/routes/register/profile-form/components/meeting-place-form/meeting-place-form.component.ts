import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { alreadyExistValidator } from '../../../../../shared/utils/validators/already-exist-validators';
import { PreferredMeetingPlace } from '../../../../../shared/models/user/preferred-meeting-place.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment';

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

  constructor(public profileForm: FormGroupDirective) {}

  // address-autofill
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
      name: new FormControl('', [Validators.required, alreadyExistValidator(this.preferredMeetingPlacesDisplay, 'name')]),
      street: new FormControl('', [Validators.required, alreadyExistValidator(this.preferredMeetingPlacesDisplay, 'street')]),
      postalCode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      userId: new FormControl('7') // TO DO : valeur à changer une fois la première partie du formulaire implémentée
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
      // save the form value for display
      this.preferredMeetingPlacesDisplay.push(this.preferredMeetingPlaceFormGroup.value);
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
