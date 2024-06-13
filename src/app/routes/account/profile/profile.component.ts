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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true,
  imports: [TabsAccountComponent, EditButtonComponent, UserPresentationComponent, ScheduleComponent, MeetingPlacesComponent, CommonModule]
})
export class ProfileComponent {
  user!: UserPresentation;
  preferredSchedules!: PreferredSchedule[];
  preferredMeetingPlaces!: PreferredMeetingPlace[];

  presentationEditMode: boolean = false;
  scheduleEditMode: boolean = false;
  meetingPlacesEditMode: boolean = false;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.fetchUserPresentation();
    this.fetchUserPreferredSchedules();
    this.fetchPreferredMeetingPlaces();
  }

  // Fetch user information from the service
  fetchUserPresentation(): void {
    this.profileService.getUserPresentation().subscribe((data) => {
      this.user = data;
    });
  }

  // Fetch user's preferred schedules from the service
  fetchUserPreferredSchedules(): void {
    this.profileService.getUserPreferredSchedules().subscribe((data) => {
      // Map fetched data to events array
      this.preferredSchedules = data.map(preferredSchedule => ({
        id: preferredSchedule.id,
        startTime: preferredSchedule.startTime,
        endTime: preferredSchedule.endTime,
        daysOfWeek: preferredSchedule.daysOfWeek,
        userId: preferredSchedule.userId
      }));
    });
  }

  // Fetch user's preferred meeting places from the service
  fetchPreferredMeetingPlaces(): void {
    this.profileService.getPreferredMeetingPlaces().subscribe((data) => {
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
