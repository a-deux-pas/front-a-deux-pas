import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { MEETING_BASE_URL } from '../../../shared/utils/constants/util-constants';
import { Meeting } from '../../../shared/models/meeting/meeting.model';
import { HandleErrorService } from '../../../shared/services/handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  getProposedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${MEETING_BASE_URL}/proposed/${userId}`
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getToBeConfirmedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${MEETING_BASE_URL}/toBeConfirmed/${userId}`
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getPlannedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${MEETING_BASE_URL}/planned/${userId}`
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  getToBeFinishedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${MEETING_BASE_URL}/toBeFinalized/${userId}`
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  acceptMeeting(meetingId: number): Observable<Meeting> {
    return this.http.put<Meeting>(`${MEETING_BASE_URL}/${meetingId}/accept`, {}
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // To be uncommented for testing the Stripe API's payment capture mechanism (demonstration purporses only)
  finalizeMeeting(meetingId: number, userId: number): Observable<Meeting> {
    return this.http.put<Meeting>(`${MEETING_BASE_URL}/finalize/${meetingId}/${userId}`, {}
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
