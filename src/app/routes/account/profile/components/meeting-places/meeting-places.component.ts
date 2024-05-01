import { Component, Input } from '@angular/core';
import { PreferredMeetingPlace } from '../../../../../shared/models/user/preferred-meeting-place.model';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-meeting-places',
    templateUrl: './meeting-places.component.html',
    styleUrl: './meeting-places.component.scss',
    standalone: true,
    imports: [TitleCasePipe]
})
export class MeetingPlacesComponent {
  @Input() preferredMeetingPlaces! : PreferredMeetingPlace[];
}
