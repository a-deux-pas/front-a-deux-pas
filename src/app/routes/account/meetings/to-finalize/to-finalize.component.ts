import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { MeetingListComponent } from '../components/meeting-list/meeting-list.component';
import { CommonModule } from '@angular/common';
import { Meeting } from '../../../../shared/models/meeting/meeting.model';
import { catchError, map, of, tap } from 'rxjs';
import { DisplayManagementService } from '../../../../shared/services/display-management.service';
import { ALERTS } from '../../../../shared/utils/constants/alert-constants';
import { Router } from '@angular/router';

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
  isBuyer: boolean = false;

  constructor(private meetingService: MeetingService, private displayManagementService: DisplayManagementService, private router: Router,) {
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
      if (Number(localStorage.getItem('userId')) === meetings[0].buyerId) {
        this.isBuyer = true
      }
    });
  }

  onSelectMeeting(meeting: Meeting) {
    this.selectedMeeting = meeting;
  }

  onFinalizingMeeting(meeting: Meeting) {
    this.meetingService.finalizeMeeting(meeting.idMeeting, Number(localStorage.getItem('userId')))
      .pipe(
        tap((updatedMeeting) => {
          if (updatedMeeting) {
            const index = this.toFinalizeMeetings.findIndex(m => m.idMeeting === updatedMeeting.idMeeting);
            if (index !== -1) {
              this.toFinalizeMeetings[index] = updatedMeeting;
              this.selectedMeeting = updatedMeeting
              if (this.selectedMeeting.validatedByBuyer && this.selectedMeeting.validatedBySeller) {
                this.toFinalizeMeetings = this.toFinalizeMeetings.filter(m => m.idMeeting !== this.selectedMeeting!.idMeeting);
                this.selectedMeeting = this.toFinalizeMeetings[index]
              }
              this.displayManagementService.displayAlert(ALERTS.MEETING_FINALIZED_SUCCESS);
            }
          }
        }), 
        catchError((error) => {
          console.error('Error while updating the appointment', error);
          this.displayManagementService.displayAlert(
            ALERTS.DEFAULT_ERROR
          );
          return of(null);
        })
      ).subscribe(); 
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
