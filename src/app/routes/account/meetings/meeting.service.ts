import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../shared/utils/constants/utils-constants';
import { MeetingProposed } from '../../../shared/models/meeting/meeting-proposed.model';
import { MeetingToConfirm } from '../../../shared/models/meeting/meeting-toconfirm.model';
import { MeetingPlanned } from '../../../shared/models/meeting/meeting-planned.model';
import { ToFinalizedMeeting } from '../../../shared/models/meeting/meeting-tofinalized.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = `${API_URL}meetings`;

  constructor(private http: HttpClient) {}

  getProposedMeetings(userId: number): Observable<MeetingProposed[]> {
    return this.http.get<MeetingProposed[]>(`${this.apiUrl}/proposed/${userId}`);
  }

  getToBeConfirmedMeetings(userId: number): Observable<MeetingToConfirm[]> {
    return this.http.get<MeetingToConfirm[]>(`${this.apiUrl}/toBeConfirmed/${userId}`);
  }

  getPlannedMeetings(userId: number): Observable<MeetingPlanned[]> {
    return this.http.get<MeetingPlanned[]>(`${this.apiUrl}/planned/${userId}`);
  }

  getToBeFinishedMeetings(userId: number): Observable<ToFinalizedMeeting[]> {
    return this.http.get<ToFinalizedMeeting[]>(`${this.apiUrl}/toBeFinalized/${userId}`);
  }
}
