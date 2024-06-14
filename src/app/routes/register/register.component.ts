import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ProfilePictureComponent } from '../../shared/components/user-presentation/profile-picture/profile-picture.component';
import { MeetingPlaceFormComponent } from './components/meeting-place-form/meeting-place-form.component';
import { ScheduleComponent } from '../../shared/components/schedule/schedule.component';
import { BankAccountFormComponent } from '../../shared/components/bank-account-form/bank-account-form.component';
import { NotificationsComponent } from '../../shared/components/notifications/notifications.component';
import { PreferredMeetingPlace } from '../../shared/models/user/preferred-meeting-place.model';
import { PreferredSchedule } from '../../shared/models/user/preferred-schedule.model';
import { EventNotification } from '../../shared/models/user/event-notification.model';
import { environment } from '../../../environments/environment';
import { AsyncValidatorService } from '../../shared/services/async-validator.service';
import { RegisterService } from './register.service';
import { UserProfile } from '../../shared/models/user/user-profile.model';
import { DomSanitizer } from '@angular/platform-browser';

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
  preferredMeetingPlaces: PreferredMeetingPlace[] = [];
  scheduleEditMode: boolean = true;
  preferredSchedules: PreferredSchedule[] = [];
  notifications!: EventNotification[];
  isSubmitted: boolean = false;

  userId = localStorage.getItem('userId');

  showErrorAlert: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private asyncValidatorService: AsyncValidatorService,
    private sanitizer: DomSanitizer,
    private registerService: RegisterService,
    private location: Location,
    private cd: ChangeDetectorRef,
  ) {
    this.profileForm = this.formBuilder.group({
      alias: ['', {
        validators:[Validators.required, Validators.minLength(3), Validators.maxLength(30)],
          asyncValidators: this.asyncValidatorService.uniqueAliasValidator(),
          updateOn: 'blur'
        }
      ],
      bio: ['', [Validators.minLength(10), Validators.maxLength(600)]],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.maxLength(5)]],
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
     // TO DO : to change once cloudinary changes done
    switch (eventType) {
      case 'uploadSuccess':
        this.isProfilePictureUploaded = true;
        console.log('picture uploaded', this.isProfilePictureUploaded);
        break;
      case 'thumbnailGenerated':
        this.isProfilePicturePreview = true;
        console.log('preview', this.isProfilePicturePreview);
        break;
      case 'fileRemoved':
        this.isProfilePicturePreview = false;
        console.log('preview', this.isProfilePicturePreview);
        break;

      default:
        break;
    }

    this.cd.detectChanges();
  }

  getUserPreferredMeetingPlaces(newPreferredMeetingPlaces: PreferredMeetingPlace[]) {
    this.preferredMeetingPlaces = newPreferredMeetingPlaces;
  }

  getUserPreferredSchedules(newPreferredSchedules: PreferredSchedule[]) {
    this.preferredSchedules = newPreferredSchedules;
  }

  getUserNotificationsPreferrences(newNotifications: EventNotification[]) {
    this.notifications = newNotifications;
  }

  isFormValid(): boolean {
    return (
      this.profileForm.invalid ||
      !this.isProfilePicturePreview ||
      this.preferredMeetingPlaces.length === 0 ||
      this.preferredSchedules.length === 0
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    setTimeout(() => {
      if (this.isProfilePictureUploaded && this.userId) {
        // TO DO : isProfilePictureUploade to remove once cloudinary changes done
        const userProfile = new UserProfile(
          this.userId,
          this.sanitizer.sanitize(SecurityContext.HTML, this.profileForm.get('alias')?.value) ?? '',
          this.sanitizer.sanitize(SecurityContext.HTML, this.profileForm.get('bio')?.value) ?? '',
          this.sanitizer.sanitize(SecurityContext.HTML, this.profileForm.get('address')?.get('city')?.value) ?? '',
          '', // TO DO : profile picture link to add once cloudinary changes done
          this.sanitizer.sanitize(SecurityContext.HTML, this.profileForm.get('address')?.get('street')?.value) ?? '',
          this.sanitizer.sanitize(SecurityContext.HTML, this.profileForm.get('address')?.get('postalCode')?.value) ?? '',
          this.sanitizer.sanitize(SecurityContext.HTML, this.profileForm.get('bankAccount')?.get('accountHolder')?.value) ?? '',
          this.sanitizer.sanitize(SecurityContext.HTML, this.profileForm.get('bankAccount')?.get('accountNumber')?.value) ?? '',
          this.preferredSchedules,
          this.preferredMeetingPlaces,
          this.notifications
        )
        this.registerService.saveProfile(userProfile).subscribe({
          next: (response) => {
            console.log('Profile saved:', response);
            this.goBack();
          },
          error: (error) => {
            console.error('Error saving profile:', error);
            this.errorAlert();
          }
        });
      } else {
        if (!this.isProfilePictureUploaded) {
          console.error('profile picture upload failed or/and UserId is null');
        }
        if (!this.userId) {
          console.error('User id is null');
        }
        this.errorAlert();
      }
    }, 10);
  }

  goBack() {
    this.location.back();
  }

  errorAlert() {
    this.showErrorAlert = true;
    setTimeout(() => {
      this.showErrorAlert = false;
    }, 3000);
  }
}
