import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonModule, Location } from '@angular/common';
import { ScheduleComponent } from '../../../shared/components/schedule/schedule.component';
import { PreferredSchedule } from '../../../shared/models/user/preferred-schedule.model';
import { BankAccountFormComponent } from '../../../shared/components/bank-account-form/bank-account-form.component';
import { MeetingPlaceFormComponent } from './components/meeting-place-form/meeting-place-form.component';
import { PreferredMeetingPlace } from '../../../shared/models/user/preferred-meeting-place.model';
import { NotificationsComponent } from '../../../shared/components/notifications/notifications.component';
import { ProfilePictureComponent } from '../../../shared/components/user-presentation/profile-picture/profile-picture.component';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProfilePictureComponent, MeetingPlaceFormComponent, ScheduleComponent, BankAccountFormComponent, NotificationsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements AfterViewInit {
  profileForm: FormGroup;
  isProfilePictureUploaded: boolean = false;
  isProfilePicturePreview: boolean = false;
  preferredMeetingPlaces: PreferredMeetingPlace[] = [];
  scheduleEditMode: boolean = true;
  preferredSchedules: PreferredSchedule[] = [];
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private cd: ChangeDetectorRef
  ) {
    this.profileForm = this.formBuilder.group({
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

  profilePictureUpload(eventType: string): void {
    if (eventType === 'uploadSuccess') {
      this.isProfilePictureUploaded = true;
    }

    if (eventType === 'thumbnailGenerated') {
      this.isProfilePicturePreview = true;
      console.log('preview', this.isProfilePicturePreview);
    }

    if (eventType === 'fileRemoved') {
      this.isProfilePicturePreview = false;
      console.log('preview', this.isProfilePicturePreview);
    }
    this.cd.detectChanges();
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
    this.isSubmitted = true;
    if (this.isProfilePictureUploaded) {
      // Continuer la sauvegarde du formulaire
    }
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  goBack() {
    this.location.back();
  }

  // TO DO :
  // changer le style de la dropzone pour le rendre plus spécifique
  // ajout des méthodes dans le profile service pour envoyer les données au back
  // déplacer le profile service dans shared
  // NAVBAR: ajouter la navbar avec une propriété hidden sur les logos et sur le bouton vendre
  // + faire comme la page d'accueil pour les marges OU avec la propriété RouterActive voir si possible de l'afficher uniquement sur page register
  // ajout du css
}
