import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, Input } from '@angular/core';
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
import { AlertMessage } from '../../shared/models/enum/alert-message.enum';
import { AlertType } from '../../shared/models/alert.model';
import { ImageService } from '../../shared/services/image.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProfilePictureComponent, MeetingPlaceFormComponent, ScheduleComponent, BankAccountFormComponent, NotificationsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements AfterViewInit {
  profilPictureUrl!: string;
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
    private cd: ChangeDetectorRef,
    // TO DO :: une fois que ca fonctionne à remplacer par image upload service
    private imageService: ImageService
  ) {
    this.profileForm = this.formBuilder.group({
      alias: ['', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
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
      // console.log(' this.userProfilePicture generated:: ', this.userProfilePicture, ' type : ', typeof this.userProfilePicture)
      console.error('2. this.userProfilePicture generated in profilePictureComponent::')
      this.userProfilePicture.forEach((value, key) => {
        console.log(`${key}: ${value}`)
        console.log(value);
      });
    } else if (eventType === 'fileRemoved') {
      console.log('thumbnail removed');
      this.userProfilePicture = userPicture;
      this.profilePicturePreview = false;
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
      !this.profilePicturePreview ||
      this.preferredMeetingPlaces.length === 0 ||
      this.preferredSchedules.length === 0
    );
  }


  async onSubmit() {
    try {
      if (!this.profilePicturePreview || !this.userId) {
        throw new Error('Profile picture upload failed or User ID is null.');
      }

      // TO DO :: faire bouger cette partie en dessus de la ligne avec const userAlias
      // Upload profile picture
      const uploadResponse = await this.imageService.upload(this.userProfilePicture, `profilePicture-${escapeHtml(this.profileForm.get('alias')?.value)}`).toPromise();
      if (!uploadResponse.imageUrl) {
        throw new Error('Failed to upload profile picture.');
      }
      this.profilPictureUrl = uploadResponse.imageUrl;
      console.log('Uploaded profile picture URL:', this.profilPictureUrl);

      // Prepare user profile data
      const userAlias = escapeHtml(this.profileForm.get('alias')?.value);
      const city = formatText(escapeHtml(this.profileForm.get('address')?.get('city')?.value));
      const postalCode = escapeHtml(this.profileForm.get('address')?.get('postalCode')?.value);
      const userProfile = new UserProfile(
        this.userId,
        this.profilPictureUrl,
        userAlias,
        escapeHtml(this.profileForm.get('bio')?.value) || null,
        city,
        escapeHtml(this.profileForm.get('address')?.get('street')?.value),
        postalCode,
        escapeHtml(this.profileForm.get('bankAccount')?.get('accountHolder')?.value),
        escapeHtml(this.profileForm.get('bankAccount')?.get('accountNumber')?.value),
        this.preferredSchedules,
        this.preferredMeetingPlaces,
        this.notifications
      );

      // Save user profile
      const saveResponse = await this.registerService.saveProfile(userProfile).toPromise();
      console.log('Profile saved:', saveResponse);
      localStorage.setItem('userAlias', userAlias);
      localStorage.setItem('userCity', `${city} (${postalCode})`);

      // Display success message and navigate back
      this.goBack();
      setTimeout(() => {
        this.displayManagementService.displayAlert({
          message: AlertMessage.PROFILE_CREATED_SUCCESS,
          type: AlertType.SUCCESS
        });
      }, 100);

    } catch (error) {
      console.error('Error submitting profile:', error);
      this.displayManagementService.displayAlert({
        message: AlertMessage.DEFAULT_ERROR,
        type: AlertType.ERROR
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
