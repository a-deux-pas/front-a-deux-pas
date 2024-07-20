import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { MeetingToConfirm } from '../../../../shared/models/meeting/meeting-toconfirm.model';
import { MeetingListComponent } from '../components/meeting-list/meeting-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-confirm',
  standalone: true,
  imports: [CommonModule, MeetingListComponent],
  template: `
        <app-meeting-list 
            [meetings]="toConfirmMeetings" 
            (modify)="onModifyMeeting($event)"
            (cancel)="onCancelMeeting($event)"
            [selectedMeeting]="selectedMeeting"
            (select)="onSelectMeeting($event)"
            [currentUserId]="userId">
        </app-meeting-list>
  `
})
export class ToConfirmComponent implements OnInit {
  toConfirmMeetings: MeetingToConfirm[] = [];
  selectedMeeting?: MeetingToConfirm;
  userId: number;

  constructor(private meetingService: MeetingService) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.loadToConfirmMeetings();
  }

  loadToConfirmMeetings() {
    this.meetingService.getToBeConfirmedMeetings(this.userId).subscribe(
      meetings => {
        this.toConfirmMeetings = meetings;
        if (meetings.length > 0) {
          this.selectedMeeting = meetings[0];
        }
        console.log(this.selectedMeeting?.status)
        console.log(this.selectedMeeting);
      }
    );
  }

  onSelectMeeting(meeting: MeetingToConfirm) {
    this.selectedMeeting = meeting;
    console.log(this.selectedMeeting?.status)
    console.log(this.selectedMeeting);
  }

  onModifyMeeting(meeting: MeetingToConfirm) {
    console.log('Modifier le rendez-vous', meeting);
  }

  onCancelMeeting(meeting: MeetingToConfirm) {
    console.log('Annuler le rendez-vous', meeting);
  }
}
