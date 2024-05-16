import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

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
      [Validators.minLength(1), Validators.maxLength(5)]),
  });

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
      city: ['']
    })
  }

  addFavoriteMeetingPlace() {
    this.favoriteMeetingPlaceForms.push(this.favoriteMeetingPlaceForm());
  }

  deleteMeetingPlaceForm(meetingPlaceIndex: number) {
    this.favoriteMeetingPlaceForms.removeAt(meetingPlaceIndex);
  }

  // Form Submit
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  // TO DO :
  // - differenciation autocomplétion
  // - verification que l'adresse n'a pas déjà été ajoutée
  // - composant schedule
  // - composant informations bancaires
}
