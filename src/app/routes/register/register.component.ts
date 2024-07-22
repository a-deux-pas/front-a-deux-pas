import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import {
  escapeHtml,
  formatText,
} from '../../shared/utils/sanitizers/custom-sanitizers';
import { AlertMessage } from '../../shared/models/enum/alert-message.enum';
import { AlertType } from '../../shared/models/alert.model';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ProfilePictureComponent,
    MeetingPlaceFormComponent,
    ScheduleComponent,
    BankAccountFormComponent,
    NotificationsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register.component.html',
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

  stripe: Stripe | null = null;

  async ngOnInit() {
    this.stripe = await loadStripe(
      'pk_test_51PehXqRqo0EYMuWs8RGL5PO2Rg5A6tIa1qPWgbDJsQtSvVDwXWEd7zRnrlcbKWs3RHdgDnkUYYxiAnk9GQosL17u006yqaLH8s'
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private asyncValidatorService: AsyncValidatorService,
    private displayManagementService: DisplayManagementService,
    private registerService: RegisterService,
    private location: Location,
    private cd: ChangeDetectorRef
  ) {
    this.profileForm = this.formBuilder.group({
      alias: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
          asyncValidators: this.asyncValidatorService.uniqueAliasValidator(),
          updateOn: 'blur',
        },
      ],
      bio: ['', [Validators.minLength(10), Validators.maxLength(600)]],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        postalCode: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5),
          ],
        ],
        city: ['', Validators.required],
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
    this.cd.detectChanges();
  }

  getUserPreferredMeetingPlaces(
    newPreferredMeetingPlaces: PreferredMeetingPlace[]
  ) {
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
    if (this.profilePicturePreview && this.userId) {
      // TO DO: Créer un service pour envoyer l'image au back
      // this.uploadPicture(this.userProfilePicture).subscribe({
      //     next: (response: any) => {
      // si le backend renvoie l'url de l'image
      // const profilePictureUrl = response.url;
      const userAlias = escapeHtml(this.profileForm.get('alias')?.value);
      const city = formatText(
        escapeHtml(this.profileForm.get('address')?.get('city')?.value)
      );
      const postalCode = escapeHtml(
        this.profileForm.get('address')?.get('postalCode')?.value
      );

      const bankAccountHolderName = escapeHtml(
        this.profileForm.get('bankAccount')?.get('accountHolder')?.value
      );
      const bankAccountNumber = escapeHtml(
        this.profileForm.get('bankAccount')?.get('accountNumber')?.value
      );
      const bankAccountTokenId = await this.generateBankAccountTokenId(
        bankAccountHolderName,
        bankAccountNumber
      );

      const userProfile = new UserProfile(
        this.userId,
        '', // à remplacer par l'URL de l'image
        userAlias,
        escapeHtml(this.profileForm.get('bio')?.value) || null,
        city,
        escapeHtml(this.profileForm.get('address')?.get('street')?.value),
        postalCode,
        bankAccountTokenId,
        this.preferredSchedules,
        this.preferredMeetingPlaces,
        this.notifications
      );
      this.registerService.saveProfile(userProfile).subscribe({
        next: (response) => {
          console.log('Profile saved:', response);
          localStorage.setItem('userAlias', userAlias);
          localStorage.setItem('userCity', `${city} (${postalCode})`);
          this.goBack();
          setTimeout(() => {
            this.displayManagementService.displayAlert({
              message: AlertMessage.PROFILE_CREATED_SUCCESS,
              type: AlertType.SUCCESS,
            });
          }, 100);
        },
        error: (error) => {
          console.error('Error saving profile:', error);
          this.displayManagementService.displayAlert({
            message: AlertMessage.DEFAULT_ERROR,
            type: AlertType.ERROR,
          });
        },
      });
      // }
    } else {
      console.error(
        `Errors: ${
          !this.profilePicturePreview ? 'Profile picture upload failed.' : ''
        } ${!this.userId ? 'User ID is null.' : ''}`
      );
      this.displayManagementService.displayAlert({
        message: AlertMessage.UPLOAD_PICTURE_ERROR,
        type: AlertType.ERROR,
      });
    }
    // });
  }

  goBack() {
    this.location.back();
  }

  async generateBankAccountTokenId(
    bankAccountHolderName: string,
    bankAccountNumber: string
  ) {
    if (!this.stripe) return '';

    const response = await this.stripe.createToken('bank_account', {
      country: 'FR',
      currency: 'eur',
      account_number: bankAccountNumber,
      account_holder_name: bankAccountHolderName,
      account_holder_type: 'individual',
    });

    if (response.error) {
      console.error('Error while generating bank account token');
      return '';
    } else {
      return response.token.id;
    }
  }
}
