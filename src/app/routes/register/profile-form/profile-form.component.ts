import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { PreferredMeetingPlace } from '../../../shared/models/user/preferred-meeting-place.model';
import { alreadyExistValidator } from '../../../shared/utils/validators/already-exist-validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements AfterViewInit {
  profileForm: FormGroup;
  favoriteMeetingPlaces: PreferredMeetingPlace[] = [];
  isAddButtonClicked: boolean = false;

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
      favoriteMeetingPlaces: this.formBuilder.array([this.favoriteMeetingPlaceForm()]), // TO DO: adapater validator
    });
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

  // Favorite meeting places
  get favoriteMeetingPlaceForms() {
    return this.profileForm.controls["favoriteMeetingPlaces"] as FormArray;
  }

  favoriteMeetingPlaceForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        alreadyExistValidator(this.favoriteMeetingPlaces, 'name')
      ]],
      street: ['', [
        Validators.required,
        alreadyExistValidator(this.favoriteMeetingPlaces, 'street')
      ]],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  addFavoriteMeetingPlace() {
    this.isAddButtonClicked = true;
    if (this.favoriteMeetingPlaceForms.valid) {
      this.favoriteMeetingPlaces.push(this.favoriteMeetingPlaceForms.value[0]);
      this.deleteMeetingPlaceForm(0);
    }
  }

  addMeetingPlaceForm() {
    this.favoriteMeetingPlaceForms.push(this.favoriteMeetingPlaceForm());
  }

  deleteMeetingPlaceForm(meetingPlaceFormIndex: number) {
    this.favoriteMeetingPlaceForms.removeAt(meetingPlaceFormIndex);
  }

  deleteFavoriteMeetingPlace(meetingPlaceIndex: number) {
    this.favoriteMeetingPlaces.splice(meetingPlaceIndex, 1);
    // TODO: remove le favoriteMeetingPlace du profileForm
  }

  // Form Submit
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  // TO DO :
  // - differenciation autocomplétion ?
  // - composant schedule
  // - composant informations bancaires
  // - tester si l'on peut refactoriser avec le meeting place component du profil
  // - tenter de refactoriser le form
}
