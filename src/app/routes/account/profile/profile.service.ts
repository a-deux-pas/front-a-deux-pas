import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreferredSchedule } from '../../../shared/models/preferred-schedule.model';
import { PreferredMeetingPlace } from '../../../shared/models/preferred-meeting-place.model';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8081/api/compte/profil';

  constructor(private http: HttpClient) {}

  getUserPreferredSchedules(): Observable<PreferredSchedule[]> {
    return this.http.get<PreferredSchedule[]>(this.apiUrl + "/disponibilités");
  }

  getPreferredMeetingPlaces(): Observable<PreferredMeetingPlace[]> {
    return this.http.get<PreferredMeetingPlace[]>(this.apiUrl + "/lieux");
  }
}
