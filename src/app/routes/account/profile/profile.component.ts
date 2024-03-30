import { Component } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { ProfileService } from './profile.service';
import { PreferredSchedule } from '../../../shared/models/preferred-schedule.model';
import { PreferredMeetingPlace } from '../../../shared/models/preferred-meeting-place.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user! : User;
  preferredSchedules!: PreferredSchedule[];
  preferredMeetingPlaces! : PreferredMeetingPlace[];

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
      console.log(this.user);
    });
    console.log(this.user);
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
  fetchPreferredMeetingPlaces():void {
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
