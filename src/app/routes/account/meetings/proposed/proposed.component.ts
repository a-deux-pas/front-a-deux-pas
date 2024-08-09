import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../../../../shared/models/meeting/meeting.model';
import { MeetingListComponent } from '../components/meeting-list/meeting-list.component';
import { CommonModule } from '@angular/common';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-proposed',
  standalone: true,
  imports: [CommonModule, MeetingListComponent],
  templateUrl: './proposed.component.html'
})
export class ProposedComponent implements OnInit {
  proposedMeetings: Meeting[] = [];
  selectedMeeting?: Meeting;
  userId: number;

  constructor(private meetingService: MeetingService) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.loadProposedMeetings();
  }

  loadProposedMeetings() {
    this.meetingService.getProposedMeetings(this.userId).pipe(
      map(meetings => meetings || []),
      catchError(error => {
        console.error('Error loading proposed meetings:', error);
        return of([]);
      })
    ).subscribe(meetings => {
      this.proposedMeetings = meetings;
      const checkoutMeeting = this.meetingService.getMeeting();
      if (meetings.length > 0) {
        if (checkoutMeeting?.meetingId) {
          window.scrollTo(0, 0);
          this.selectedMeeting = this.proposedMeetings.find(proposedMeeting => proposedMeeting.idMeeting === checkoutMeeting.meetingId);
          this.meetingService.setMeeting(null);
        } else {
          this.selectedMeeting = meetings[0];
        }
      } else {
        this.selectedMeeting = undefined;
      }
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
