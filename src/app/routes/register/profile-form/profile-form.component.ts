import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  formVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) {
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
      favoriteMeetingPlace: this.formBuilder.group({
        name: [''],
        street: [''],
        postalCode: [''],
        city: [''],
      }),
    });
  }

  ngOnInit(): void {
    console.log(this.profileForm.get('favoriteMeetingPlace')?.status);
    console.log(this.profileForm.get('favoriteMeetingPlace')?.valid);
    console.log(this.profileForm.get('favoriteMeetingPlace')?.errors);
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
  get favoriteMeetingPlaceFormGroup() {
    return this.profileForm.get('favoriteMeetingPlace') as FormGroup;
  }

  addFavoriteMeetingPlace() {
    console.log(this.profileForm.get('favoriteMeetingPlace')?.status); // Should be 'VALID'
    console.log(this.profileForm.get('favoriteMeetingPlace')?.valid);
    console.log(this.profileForm.get('favoriteMeetingPlace')?.errors);
    this.isAddButtonClicked = true;
    this.formVisible = true;
    this.cdRef.detectChanges();
    console.log(this.profileForm.get('favoriteMeetingPlace')?.status); // Should be 'VALID'
    console.log(this.profileForm.get('favoriteMeetingPlace')?.valid);
    console.log(this.profileForm.get('favoriteMeetingPlace')?.errors);
    // Object.keys(this.favoriteMeetingPlaceFormGroup.controls).forEach(controlName => {
    //   if (this.isAddButtonClicked) {
    //     this.favoriteMeetingPlaceFormGroup.get(controlName)?.setValidators([Validators.required]);
    //     if (controlName === 'name' || controlName === 'street' ) {
    //       this.favoriteMeetingPlaceFormGroup.get(controlName)?.setValidators(
    //         [alreadyExistValidator(this.favoriteMeetingPlacesDisplay, controlName)]
    //       )
    //     };
    //   } else {
    //     this.favoriteMeetingPlaceFormGroup.get(controlName)?.setValidators(null);
    //   }
    //   });
    //this.favoriteMeetingPlaceFormGroup.updateValueAndValidity();
    if (this.favoriteMeetingPlaceFormGroup.valid) {
      const value = this.favoriteMeetingPlaceFormGroup.value;
      // ajouter le meeting place à une liste pour permettre son affichage
      this.favoriteMeetingPlacesDisplay.push(value);
      // ajouter ce meeting place aux valeurs déjà rentrées dans le formulaire
      this.favoriteMeetingPlaceFormGroup.reset();
      this.isAddButtonClicked = false;
    }
  }

  deleteFavoriteMeetingPlace(meetingPlaceIndex: number) {
    this.favoriteMeetingPlacesDisplay.splice(meetingPlaceIndex, 1);
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
