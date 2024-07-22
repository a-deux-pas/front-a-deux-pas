import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../../../../shared/models/meeting/meeting.model';
import { MeetingListComponent } from '../components/meeting-list/meeting-list.component';
import { CommonModule } from '@angular/common';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-to-confirm',
  standalone: true,
  imports: [CommonModule, MeetingListComponent],
  templateUrl: './to-confirm.component.html'
})
export class ToConfirmComponent implements OnInit {
  toConfirmMeetings: Meeting[] = [];
  selectedMeeting?: Meeting;
  userId: number;

  constructor(private meetingService: MeetingService) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.loadToConfirmMeetings();
  }

  loadToConfirmMeetings() {
    this.meetingService.getToBeConfirmedMeetings(this.userId).pipe(
      map(meetings => meetings || []),
      catchError(error => {
        console.error('Error loading meetings:', error);
        return of([]);
      })
    ).subscribe(meetings => {
      this.toConfirmMeetings = meetings;
      this.selectedMeeting = meetings.length > 0 ? meetings[0] : undefined;
    });
  }

  onSelectMeeting(meeting: Meeting) {
    this.selectedMeeting = meeting;
  }

  onModifyMeeting(meeting: Meeting) {
    // TO DO: Implémentez la logique pour modifier le rendez-vous
    console.log('Modifier le rendez-vous', meeting);
  }

  onCancelMeeting(meeting: Meeting) {
     // TO DO: Implémentez la logique pour annuler le rendez-vous
    console.log('Annuler le rendez-vous', meeting);
  }
}
