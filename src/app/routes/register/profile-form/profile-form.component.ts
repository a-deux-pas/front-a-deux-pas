import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '../../../shared/components/schedule/schedule.component';
import { PreferredSchedule } from '../../../shared/models/user/preferred-schedule.model';
import { BankAccountFormComponent } from '../../../shared/components/bank-account-form/bank-account-form.component';
import { MeetingPlaceFormComponent } from './components/meeting-place-form/meeting-place-form.component';
import { PreferredMeetingPlace } from '../../../shared/models/user/preferred-meeting-place.model';
import { NotificationsComponent } from '../../../shared/components/notifications/notifications.component';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MeetingPlaceFormComponent, ScheduleComponent, BankAccountFormComponent, NotificationsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements AfterViewInit {
  profileForm: FormGroup;
  preferredMeetingPlaces: PreferredMeetingPlace[] = [];
  scheduleEditMode: boolean = true;
  preferredSchedules: PreferredSchedule[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      profilePicture: ['', Validators.required],
      alias: ['', [Validators.required, Validators.minLength(3)]],
      bio: ['', Validators.minLength(10)],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required]
      }),
    });
  }

  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('mapbox-address-autofill');
    // Convertir NodeList en tableau
    const elementsArray = Array.from(elements);
    elementsArray.forEach((autofill: any) => {
      autofill.accessToken = environment.mapbox.accessToken;
    });
  }

  getUserPreferredMeetingPlaces(newPreferredMeetingPlaces: PreferredMeetingPlace[]) {
    this.preferredMeetingPlaces = newPreferredMeetingPlaces;
    console.log(this.preferredMeetingPlaces);
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
  // creation du service pour envoyer les données au back
  // refactorisation composant bank-account-form
  // NAVBAR: ajouter la navbar avec une propriété hidden sur les logos et sur le bouton vendre
  // + faire comme la page d'accueil pour les marges OU avec la propriété RouterActive voir si possible de l'afficher uniquement sur page register
  // ajout du css
  // - differenciation autocomplétion ?
}
