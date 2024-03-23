import { Component, Input, OnInit } from '@angular/core';
import { PreferredMeetingPlace } from '../../../../../shared/models/preferred-meeting-place.model';

@Component({
  selector: 'app-meeting-places',
  templateUrl: './meeting-places.component.html',
  styleUrl: './meeting-places.component.scss'
})
export class MeetingPlacesComponent {
  @Input() preferredMeetingPlaces! : PreferredMeetingPlace[];
}
