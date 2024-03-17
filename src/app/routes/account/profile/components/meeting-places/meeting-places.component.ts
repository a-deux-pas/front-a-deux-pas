import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { PreferredMeetingPlace } from '../../../../../shared/models/preferred-meeting-place.model';

@Component({
  selector: 'app-meeting-places',
  templateUrl: './meeting-places.component.html',
  styleUrl: './meeting-places.component.scss'
})
export class MeetingPlacesComponent implements OnInit{

  preferredMeetingPlaces : PreferredMeetingPlace[] =  [];
  count: number = 0;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    // Fetch user's preferred meeting places
    this.profileService.getPreferredMeetingPlaces().subscribe((data) => {
    this.preferredMeetingPlaces = data;
    });
  }
}
