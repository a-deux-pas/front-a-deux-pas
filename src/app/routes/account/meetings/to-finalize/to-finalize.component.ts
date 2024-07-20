import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { MeetingProposed } from '../../../../shared/models/meeting/meeting-proposed.model';
import { MeetingListComponent } from '../components/meeting-list/meeting-list.component';
import { CommonModule } from '@angular/common';
import { ToFinalizedMeeting } from '../../../../shared/models/meeting/meeting-tofinalized.model';

@Component({
  selector: 'app-to-finalize',
  standalone: true,
  imports: [CommonModule, MeetingListComponent],
  template: `
        <app-meeting-list 
            [meetings]="toFinalizeMeetings" 
            (modify)="onModifyMeeting($event)"
            (cancel)="onCancelMeeting($event)"
            [selectedMeeting]="selectedMeeting"
            (select)="onSelectMeeting($event)"
            [currentUserId]="userId">
        </app-meeting-list>
  `
})

export class ToFinalizeComponent implements OnInit {
  toFinalizeMeetings: ToFinalizedMeeting[] = [];
  selectedMeeting?: ToFinalizedMeeting;
  userId: number;

  constructor(private meetingService: MeetingService) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.loadToFinalizeMeetings();
  }

  loadToFinalizeMeetings() {
    this.meetingService.getToBeFinishedMeetings(this.userId).subscribe(
      meetings => {
        this.toFinalizeMeetings = meetings;
        if (meetings.length > 0) {
          this.selectedMeeting = meetings[0];
        }
        console.log(this.selectedMeeting?.status)
        console.log(this.selectedMeeting);
      }
    );
  }

  onSelectMeeting(meeting: ToFinalizedMeeting) {
    this.selectedMeeting = meeting;
    console.log(this.selectedMeeting?.status)
    console.log(this.selectedMeeting);
  }

  onModifyMeeting(meeting: ToFinalizedMeeting) {
    // Implémentez la logique pour modifier le rendez-vous
    console.log('Modifier le rendez-vous', meeting);
  }

  onCancelMeeting(meeting: ToFinalizedMeeting) {
    // Implémentez la logique pour annuler le rendez-vous
    console.log('Annuler le rendez-vous', meeting);
  }
}