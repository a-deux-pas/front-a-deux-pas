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
export class ProfileComponent{
  user! : User;
  preferredSchedules!: PreferredSchedule[];
  preferredMeetingPlaces! : PreferredMeetingPlace[];

  presentationEditMode: boolean = false;
  scheduleEditMode: boolean = false;
  meetingPlacesEditMode: boolean = false;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.fetchUserInformation();
    this.fetchUserPreferredSchedules();
    this.fetchPreferredMeetingPlaces();
  }

  fetchUserInformation(): void {
    this.profileService.getUserInformation().subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
    console.log(this.user);
  }

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

  fetchPreferredMeetingPlaces():void {
      this.profileService.getPreferredMeetingPlaces().subscribe((data) => {
        this.preferredMeetingPlaces = data;
      });
  }

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
