import { Component } from '@angular/core';
import { UserPresentation } from '../../../shared/models/user/user-presentation.model';
import { ProfileService } from './profile.service';
import { PreferredSchedule } from '../../../shared/models/user/preferred-schedule.model';
import { PreferredMeetingPlace } from '../../../shared/models/user/preferred-meeting-place.model';
import { MeetingPlacesComponent } from './components/meeting-places/meeting-places.component';
import { ScheduleComponent } from '../../../shared/components/schedule/schedule.component';
import { UserPresentationComponent } from '../../../shared/components/user-presentation/user-presentation.component';
import { EditButtonComponent } from './components/edit-button/edit-button.component';
import { TabsAccountComponent } from '../../../shared/components/tabs-account/tabs-account.component';
import { CommonModule } from '@angular/common';
import { UserPresentationService } from '../../../shared/components/user-presentation/user-presentation.service';
import { UserService } from '../../../shared/services/user.service';
import { UserAliasAndLocation } from '../../../shared/models/user/user-alias-and-location.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true,
  imports: [
    TabsAccountComponent,
    EditButtonComponent,
    UserPresentationComponent,
    ScheduleComponent,
    MeetingPlacesComponent,
    CommonModule,
  ],
})
export class ProfileComponent {
  user!: UserPresentation;
  preferredSchedules!: PreferredSchedule[];
  preferredMeetingPlaces!: PreferredMeetingPlace[];
  presentationEditMode: boolean = false;
  scheduleEditMode: boolean = false;
  meetingPlacesEditMode: boolean = false;
  userId: number = Number(localStorage.getItem('userId'));
  userAlias: string | null = localStorage.getItem('userAlias');
  profileLoading: boolean = true;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private userPresentationService: UserPresentationService
  ) {}

  ngOnInit(): void {
    if (!this.userAlias && this.userId) {
      this.getUserAlias(this.userId);
    }
    if (this.userAlias) {
      this.fetchUserPresentation(this.userAlias);
    }
    if (this.userId) {
      this.fetchUserPreferredSchedules(this.userId);
      this.fetchPreferredMeetingPlaces(this.userId);
    }
    setTimeout(() => {
      this.profileLoading = false;
    }, 50);
  }

  private getUserAlias(userId: number): void {
    this.userService
      .getUserAliasAndLocation(userId)
      .subscribe((data: UserAliasAndLocation) => {
        this.userAlias = data.alias;
        this.fetchUserPresentation(this.userAlias);
      });
  }

  // Fetch user's information from the service
  private fetchUserPresentation(userAlias: string): void {
    this.userPresentationService
      .getUserPresentation(userAlias)
      .subscribe((data) => {
        this.user = data;
      });
  }

  // Fetch user's preferred schedules from the service
  private fetchUserPreferredSchedules(userId: number): void {
    this.profileService.getUserPreferredSchedules(userId).subscribe((data) => {
      // Map fetched data to events array
      this.preferredSchedules = data.map((preferredSchedule) => ({
        id: preferredSchedule.id,
        startTime: preferredSchedule.startTime,
        endTime: preferredSchedule.endTime,
        daysOfWeek: preferredSchedule.daysOfWeek,
        userId: preferredSchedule.userId,
      }));
    });
  }

  // Fetch user's preferred meeting places from the service
  private fetchPreferredMeetingPlaces(userId: number): void {
    this.profileService.getPreferredMeetingPlaces(userId).subscribe((data) => {
      this.preferredMeetingPlaces = data;
    });
  }

  // Handle edit mode change for different sections of the profile
  onEditModeChange(editMode: boolean, componentId: string): void {
    if (componentId === 'presentation') {
      this.presentationEditMode = editMode;
    } else if (componentId === 'schedule') {
      this.scheduleEditMode = editMode;
    } else if (componentId === 'meeting-places') {
      this.meetingPlacesEditMode = editMode;
    }
  }
}
