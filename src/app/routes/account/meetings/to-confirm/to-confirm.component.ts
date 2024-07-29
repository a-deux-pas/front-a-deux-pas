import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../../../../shared/models/meeting/meeting.model';
import { MeetingListComponent } from '../components/meeting-list/meeting-list.component';
import { CommonModule } from '@angular/common';
import { catchError, finalize, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ALERTS } from '../../../../shared/utils/constants/alert-constants';
import { DisplayManagementService } from '../../../../shared/services/display-management.service';
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

  constructor(
    private meetingService: MeetingService,
    private router: Router,
    private displayManagementService: DisplayManagementService
  ) {
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

  onAcceptMeeting(meeting: Meeting) {
    this.meetingService.acceptMeeting(meeting.idMeeting).pipe(
      tap((updatedMeeting) => {
        if (updatedMeeting) {
          // Remove the accepted meeting from the list
          this.toConfirmMeetings = this.toConfirmMeetings.filter(m => m.idMeeting !== updatedMeeting.idMeeting);
        }
      }),
      catchError((error) => {
        console.error('Error while accepting the appointment', error);
        this.displayManagementService.displayAlert(
          ALERTS.DEFAULT_ERROR
        );
        return of(null);
      }),
      finalize(() => {
        this.router.navigate(['/compte/rdv/planifies']).then(() => {
          this.displayManagementService.displayAlert(ALERTS.MEETING_ACCEPTED_SUCCESS);
        });
      })
    ).subscribe();
  }

  onModifyMeeting(meeting: Meeting) {
    // TO DO: Implémentez la logique pour modifier le rendez-vous
  }

  onCancelMeeting(meeting: Meeting) {
     // TO DO: Implémentez la logique pour annuler le rendez-vous
  }
}
