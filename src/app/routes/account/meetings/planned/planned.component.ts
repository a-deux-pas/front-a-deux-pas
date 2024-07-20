import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from '../components/meeting-list/meeting-list.component';
import { MeetingPlanned } from '../../../../shared/models/meeting/meeting-planned.model';


@Component({
  selector: 'app-planned',
  standalone: true,
  imports: [CommonModule, MeetingListComponent],
  template: `
        <app-meeting-list 
            [meetings]="plannedMeetings" 
            (modify)="onModifyMeeting($event)"
            (cancel)="onCancelMeeting($event)"
            [selectedMeeting]="selectedMeeting"
            (select)="onSelectMeeting($event)"
            [currentUserId]="userId">
        </app-meeting-list>
  `
})
export class PlannedComponent implements OnInit {
  plannedMeetings: MeetingPlanned[] = [];
  selectedMeeting?: MeetingPlanned;
  userId: number;
  

  constructor(private meetingService: MeetingService) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.loadPlannedMeetings();
  }

  loadPlannedMeetings() {
    this.meetingService.getPlannedMeetings(this.userId).subscribe(
      meetings => {
        this.plannedMeetings = meetings;
        if (meetings.length > 0) {
          this.selectedMeeting = meetings[0];
        }
        console.log(this.selectedMeeting?.status)
        console.log(this.selectedMeeting)
      }
    );
  }

  onSelectMeeting(meeting: MeetingPlanned) {
    this.selectedMeeting = meeting;
  }

  onModifyMeeting(meeting: MeetingPlanned) {
    // Implémentez la logique pour modifier le rendez-vous
    console.log('Modifier le rendez-vous', meeting);
  }

  onCancelMeeting(meeting: MeetingPlanned) {
    // Implémentez la logique pour annuler le rendez-vous
    console.log('Annuler le rendez-vous', meeting);
  }
}