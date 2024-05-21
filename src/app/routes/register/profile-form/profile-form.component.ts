import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class ProfileFormComponent implements OnInit, AfterViewInit {
  profileForm: FormGroup;
  favoriteMeetingPlacesDisplay: PreferredMeetingPlace[] = [];
  isAddButtonClicked: boolean = false;
  favoriteMeetingPlaceForm: FormGroup;

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

    this.favoriteMeetingPlaceForm = new FormGroup({
      name: new FormControl('', [Validators.required, alreadyExistValidator(this.favoriteMeetingPlacesDisplay, 'name')]),
      street: new FormControl('', [Validators.required, alreadyExistValidator(this.favoriteMeetingPlacesDisplay, 'street')]),
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

  addFavoriteMeetingPlace() {
    this.isAddButtonClicked = true;
    // add the favorite meeting place form to the profile Form
    this.profileForm.addControl('favoriteMeetingPlace', this.favoriteMeetingPlaceForm);
    if (this.favoriteMeetingPlaceForm.valid) {
      // save the form value for display
      this.favoriteMeetingPlacesDisplay.push(this.favoriteMeetingPlaceForm.value);
      // reset the form and remove controls
      this.deleteFavoriteMeetingPlaceForm();
    }
  }

  deleteFavoriteMeetingPlace(meetingPlaceIndex: number) {
    this.favoriteMeetingPlacesDisplay.splice(meetingPlaceIndex, 1);
  }

  deleteFavoriteMeetingPlaceForm() {
    this.favoriteMeetingPlaceForm.reset();
    this.isAddButtonClicked = false;
    this.profileForm.removeControl('favoriteMeetingPlace');;
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
