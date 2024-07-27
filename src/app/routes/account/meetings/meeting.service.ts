import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../shared/utils/constants/util-constants';
import { Meeting } from '../../../shared/models/meeting/meeting.model';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private apiUrl = `${API_URL}meetings`;

  constructor(private http: HttpClient) {}

  getProposedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/proposed/${userId}`);
  }

  getToBeConfirmedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/toBeConfirmed/${userId}`);
  }

  getPlannedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/planned/${userId}`);
  }

  getToBeFinishedMeetings(userId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/toBeFinalized/${userId}`);
  }

  acceptMeeting(meetingId: number): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.apiUrl}/${meetingId}/accept`, {});
  }

  // To be uncommented for testing the Stripe API's payment capture mechanism (demonstration purporses only)
  /*finalizeMeeting(meetingId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/finalize/${meetingId}`);
  }*/
}
