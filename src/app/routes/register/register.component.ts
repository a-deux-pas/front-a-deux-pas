import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProfilePictureComponent } from '../../shared/components/user-presentation/profile-picture/profile-picture.component';
import { MeetingPlaceFormComponent } from './components/meeting-place-form/meeting-place-form.component';
import { ScheduleComponent } from '../../shared/components/schedule/schedule.component';
import { BankAccountFormComponent } from '../../shared/components/bank-account-form/bank-account-form.component';
import { NotificationsComponent } from '../../shared/components/notifications/notifications.component';
import { PreferredMeetingPlace } from '../../shared/models/user/preferred-meeting-place.model';
import { PreferredSchedule } from '../../shared/models/user/preferred-schedule.model';
import { EventNotification } from '../../shared/models/user/event-notification.model';
import { ProfileService } from '../account/profile/profile.service';
import { environment } from '../../../environments/environment';
import { AsyncValidatorService } from '../../shared/services/async-validator.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProfilePictureComponent, MeetingPlaceFormComponent, ScheduleComponent, BankAccountFormComponent, NotificationsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements AfterViewInit {
  profileForm: FormGroup;
  isProfilePictureUploaded: boolean = false;
  isProfilePicturePreview: boolean = false;
  preferredMeetingPlaces!: PreferredMeetingPlace[];
  scheduleEditMode: boolean = true;
  preferredSchedules!: PreferredSchedule[];
  notifications!: EventNotification[];
  isSubmitted: boolean = false;

  userId = localStorage.getItem('userId');

  errorWhenSubmittingMsg: boolean = false
  adSuccessfullySubmitted: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private asyncValidatorService: AsyncValidatorService,
    private profileService: ProfileService,
    private router: Router,
    private location: Location,
    private cd: ChangeDetectorRef
  ) {
    this.profileForm = this.formBuilder.group({
      alias: ['', {
        validators:[Validators.required, Validators.minLength(3)],
        asyncValidators: this.asyncValidatorService.uniqueAliasValidator(),
        updateOn: 'blur'
        }
      ],
      bio: ['', [Validators.minLength(10)]],
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
    console.log(this.userId)
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
  }

  getUserNotificationsPreferrences(newNotifications: EventNotification[]) {
    this.notifications = newNotifications;
  }

  // Form Submit
  onSubmit() {
    this.isSubmitted = true;
    setTimeout(() => {
      if (this.isProfilePictureUploaded) {
        const userInfo: any = {
          userId: this.userId,
          alias: this.profileForm.get('alias')?.value,
          bio: this.profileForm.get('bio')?.value,
          street: this.profileForm.get('address')?.get('street')?.value,
          city: this.profileForm.get('address')?.get('city')?.value,
          postalCode: this.profileForm.get('address')?.get('postalCode')?.value,
          bankAccountHolder: this.profileForm.get('bankAccount')?.get('accountHolder')?.value,
          bankAccountNumber: this.profileForm.get('bankAccount')?.get('accountNumber')?.value,
          preferredMeetingPlaces: this.preferredMeetingPlaces,
          preferredSchedules: this.preferredSchedules,
          notifications: this.notifications,
        }
        this.profileService.saveProfile(userInfo).subscribe({
          next: (response) => {
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
}
