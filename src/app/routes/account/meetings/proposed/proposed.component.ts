import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../../../../shared/models/meeting/meeting.model';
import { MeetingListComponent } from '../components/meeting-list/meeting-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proposed',
  standalone: true,
  imports: [CommonModule, MeetingListComponent],
  template: `
        <app-meeting-list 
            [meetings]="proposedMeetings" 
            (modify)="onModifyMeeting($event)"
            (cancel)="onCancelMeeting($event)"
            [selectedMeeting]="selectedMeeting"
            (select)="onSelectMeeting($event)"
            [currentUserId]="userId">
        </app-meeting-list>
  `
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
    this.meetingService.getProposedMeetings(this.userId).subscribe(
      meetings => {
        this.proposedMeetings = meetings;
        if (meetings.length > 0) {
          this.selectedMeeting = meetings[0];
        }
      }
    );
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
