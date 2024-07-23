import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component } from '@angular/core';
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
import { AsyncValidatorService } from '../../shared/services/async-validator.service';
import { RegisterService } from './register.service';
import { UserProfile } from '../../shared/models/user/user-profile.model';
import { DisplayManagementService } from '../../shared/services/display-management.service';
import { escapeHtml, formatText } from '../../shared/utils/sanitizers/custom-sanitizers';
import { ALERTS } from '../../shared/utils/constants/alert-constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProfilePictureComponent, MeetingPlaceFormComponent, ScheduleComponent, BankAccountFormComponent, NotificationsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements AfterViewInit {
  profileForm: FormGroup;
  userProfilePicture!: FormData;
  profilePicturePreview: boolean = false;
  preferredMeetingPlaces: PreferredMeetingPlace[] = [];
  scheduleEditMode: boolean = true;
  preferredSchedules: PreferredSchedule[] = [];
  notifications!: EventNotification[];
  showErrorAlert: boolean = false;
  userId = localStorage.getItem('userId');

  constructor(
    private formBuilder: FormBuilder,
    private asyncValidatorService: AsyncValidatorService,
    private displayManagementService: DisplayManagementService,
    private registerService: RegisterService,
    private location: Location,
    private changeDetector: ChangeDetectorRef
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
        postalCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        city: ['', Validators.required]
      }),
    });
  }

  ngAfterViewInit(): void {
    this.displayManagementService.configureAddressAutofill();
  }

  getUserprofilePicture(eventType: string, userPicture: FormData): void {
    if (eventType === 'thumbnailGenerated' && userPicture) {
      console.log('thumbnail generated');
      this.profilePicturePreview = true;
      this.userProfilePicture = userPicture;
    } else if (eventType === 'fileRemoved') {
      console.log('thumbnail removed');
      this.userProfilePicture = userPicture;
      this.profilePicturePreview = false;
    }
    this.changeDetector.detectChanges();
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
      !this.profilePicturePreview ||
      this.preferredMeetingPlaces.length === 0 ||
      this.preferredSchedules.length === 0
    );
  }

  onSubmit() {
    if (this.profilePicturePreview && this.userId) {
      // TO DO: Créer un service pour envoyer l'image au back
      // this.uploadPicture(this.userProfilePicture).subscribe({
      //     next: () => {
              // si le backend renvoie l'url de l'image
              // const profilePictureUrl = response.url;
              const userAlias = escapeHtml(this.profileForm.get('alias')?.value);
              const userProfile = new UserProfile(
                this.userId,
                '', // à remplacer par l'URL de l'image
                userAlias,
                escapeHtml(this.profileForm.get('bio')?.value) || null,
                formatText(escapeHtml(this.profileForm.get('address')?.get('city')?.value)),
                escapeHtml(this.profileForm.get('address')?.get('street')?.value),
                escapeHtml(this.profileForm.get('address')?.get('postalCode')?.value),
                escapeHtml(this.profileForm.get('bankAccount')?.get('accountHolder')?.value),
                escapeHtml(this.profileForm.get('bankAccount')?.get('accountNumber')?.value),
                this.preferredSchedules,
                this.preferredMeetingPlaces,
                this.notifications
              );
              this.registerService.saveProfile(userProfile).subscribe({
                next: () => {
                  localStorage.setItem('userAlias', userAlias);
                  this.goBack();
                  setTimeout(() => {
                    this.displayManagementService.displayAlert(
                      ALERTS.PROFILE_CREATED_SUCCESS,
                    );
                  }, 100);
                },
                error: () => {
                  this.displayManagementService.displayAlert(
                    ALERTS.DEFAULT_ERROR
                  );
                }
              });
          // }
            } else {
              console.error(`Errors: ${!this.profilePicturePreview ?
                'Profile picture upload failed.' : ''} ${!this.userId ? 'User ID is null.' : ''}`);
              this.displayManagementService.displayAlert(
                ALERTS.DEFAULT_ERROR
              );
            }
      // });
  }

  goBack() {
    this.location.back();
  }
}
