import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { MeetingListComponent } from '../components/meeting-list/meeting-list.component';
import { CommonModule } from '@angular/common';
import { Meeting } from '../../../../shared/models/meeting/meeting.model';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-to-finalize',
  standalone: true,
  imports: [CommonModule, MeetingListComponent],
  templateUrl: './to-finalize.component.html'
})

export class ToFinalizeComponent implements OnInit {
  toFinalizeMeetings: Meeting[] = [];
  selectedMeeting?: Meeting;
  userId: number;

  constructor(private meetingService: MeetingService) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.loadToFinalizeMeetings();
  }

  loadToFinalizeMeetings() {
    this.meetingService.getToBeFinishedMeetings(this.userId).pipe(
      map(meetings => meetings || []),
      catchError(error => {
        console.error('Error loading meetings to finalize:', error);
        return of([]);
      })
    ).subscribe(meetings => {
      this.toFinalizeMeetings = meetings;
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
