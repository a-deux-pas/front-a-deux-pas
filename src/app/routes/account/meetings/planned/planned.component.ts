import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from '../components/meeting-list/meeting-list.component';
import { Meeting } from '../../../../shared/models/meeting/meeting.model';
import { catchError, map, of } from 'rxjs';


@Component({
  selector: 'app-planned',
  standalone: true,
  imports: [CommonModule, MeetingListComponent],
  templateUrl:'./planned.component.html'
})
export class PlannedComponent implements OnInit {
  plannedMeetings: Meeting[] = [];
  selectedMeeting?: Meeting;
  userId: number;


  constructor(private meetingService: MeetingService) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.loadPlannedMeetings();
  }

  loadPlannedMeetings() {
    this.meetingService.getPlannedMeetings(this.userId).pipe(
      map(meetings => meetings || []),
      catchError(error => {
        console.error('Error loading planned meetings:', error);
        return of([]);
      })
    ).subscribe(meetings => {
      this.plannedMeetings = meetings;
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
