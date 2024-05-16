import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { conditionallyRequiredValidator } from './custom.validator';
import { PreferredMeetingPlace } from '../../../shared/models/user/preferred-meeting-place.model';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements AfterViewInit {
  profileForm = this.formBuilder.group({
    profilePicture: ['', Validators.required],
    alias: ['', [Validators.required, Validators.minLength(3)]],
    bio: ['', Validators.minLength(10)],
    notification: [''],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required]
    }),
    favoriteMeetingPlaces: this.formBuilder.array(
      [this.favoriteMeetingPlaceForm()],
      [Validators.minLength(2), Validators.maxLength(5)]), // TO DO: adapater validator
  });

  favoriteMeetingPlaces: PreferredMeetingPlace[] = [];

  constructor(private formBuilder: FormBuilder) {}

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
      name: [''],
      street: [''],
      postalCode: [''],
      city: [''],
    });
  }

  addFavoriteMeetingPlace(favoriteMeetingPlace: PreferredMeetingPlace) {
    console.log(favoriteMeetingPlace);
    if (favoriteMeetingPlace.name != '') {
      this.favoriteMeetingPlaceForms.push(this.favoriteMeetingPlaceForm());
      this.favoriteMeetingPlaces.push(favoriteMeetingPlace);
      this.deleteMeetingPlaceForm(0);
    }
     // TODO: push le favoriteMeetingPlace dans le profileForm
  }

  deleteMeetingPlaceForm(meetingPlaceIndex: number) {
    this.favoriteMeetingPlaceForms.removeAt(meetingPlaceIndex);
    // TODO: remove le favoriteMeetingPlace du profileForm
  }

  // Form Submit
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  // TO DO :
  // - differenciation autocomplétion ?
  // - ajouter validations conditionnelles après que le nom de du meeting place soit rempli
  // - verification que l'adresse n'a pas déjà été ajoutée
  // - composant schedule
  // - composant informations bancaires
  // - tester si l'on peut refactoriser avec le meeting place component du profil
  // - tenter de refactoriser le form
}
