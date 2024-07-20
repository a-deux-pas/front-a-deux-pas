import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { MeetingProposed } from '../../../../shared/models/meeting/meeting-proposed.model';
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
  proposedMeetings: MeetingProposed[] = [];
  selectedMeeting?: MeetingProposed;
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
        console.log(this.selectedMeeting?.status)
        console.log(this.selectedMeeting);
      }
    );
  }

  onSelectMeeting(meeting: MeetingProposed) {
    this.selectedMeeting = meeting;
    console.log(this.selectedMeeting?.status)
    console.log(this.selectedMeeting);
  
  }

  onModifyMeeting(meeting: MeetingProposed) {
    console.log('Modifier le rendez-vous', meeting);
  }

  onCancelMeeting(meeting: MeetingProposed) {
    console.log('Annuler le rendez-vous', meeting);
  }
  
}
