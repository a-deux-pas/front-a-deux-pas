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
import { ProfileService } from '../../account/profile/profile.service';
import { Router } from '@angular/router';

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
  notifications: Array<string> = [];
  isSubmitted: boolean = false;

  userId: number = 7;

  errorWhenSubmittingMsg: boolean = false
  adSuccessfullySubmitted: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
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
      console.log('picture uploaded', this.isProfilePictureUploaded);
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
    console.log(this.preferredSchedules);
  }

  getUserNotificationsPreferrences(newNotifications: Array<string>) {
    this.notifications = newNotifications;
  }

  // Form Submit
  onSubmit() {
    this.isSubmitted = true;
    setTimeout(() => {
      if (this.isProfilePictureUploaded) {
        const userInfo: any = {
          userId: this.userId, // TO DO: à modifier une fois la première partie du formulaire implémentée
          email: "test@gmail.com", // à supprimer une fois la première partie du formulaire implémentée
          password:"testkjlkjflkjflj", // // à supprimer une fois la première partie du formulaire implémentée
          alias: this.profileForm.get('alias')?.value,
          bio: this.profileForm.get('bio')?.value,
          street: this.profileForm.get('address')?.get('street')?.value,
          city: this.profileForm.get('address')?.get('city')?.value,
          postalCode: this.profileForm.get('address')?.get('postalCode')?.value,
          accountHolder: this.profileForm.get('bankAccount')?.get('accountHolder')?.value,
          accountNumber: this.profileForm.get('bankAccount')?.get('accountNumber')?.value,
          preferredMeetingPlaces: this.preferredMeetingPlaces,
          preferredSchedules: this.preferredSchedules,
          notifications: this.notifications,
        }
        this.profileService.saveProfile(userInfo).subscribe({
          next: (response)  => {
              //this.goBack();
              console.log('Profile saved:', response);
              this.router.navigate(['accueil'], {
                queryParams: { success: true }
              });
          },
          error: (error) => {
            console.error('Error saving profile:', error);
            this.errorWhenSubmittingMsg = true;
            setTimeout(() => {
              this.errorWhenSubmittingMsg = false;
            }, 10);
          }
        });
      }
    }, 10);
  }

  goBack() {
    this.location.back();
  }

  // TO DO :
  // ajouter une contrainte de 5 chiffres max postalCode
  // ajouter success message et error message à l'échelle de l'app avec un message sous forme de variable
  // changer le style de la dropzone pour le rendre plus spécifique
  // déplacer le profile service dans shared
  // NAVBAR: ajouter la navbar avec une propriété hidden sur les logos et sur le bouton vendre
  // + faire comme la page d'accueil pour les marges OU avec la propriété RouterActive voir si possible de l'afficher uniquement sur page register
  // ajout du css
}
