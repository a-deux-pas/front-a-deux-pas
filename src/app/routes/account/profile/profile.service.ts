import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { PreferredSchedule } from '../../../shared/models/user/preferred-schedule.model';
import { PreferredMeetingPlace } from '../../../shared/models/user/preferred-meeting-place.model';
import { User } from '../../../shared/models/user/user.model';
import { API_URL } from '../../../shared/utils/constants/utils-constants';
import { UtilsService } from '../../../shared/services/utils-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${API_URL}api/account/profile`;

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService) { }

  // Fetch user information from the API
  getUserPresentation(): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/presentation")
      .pipe(
        catchError(this.utilsService.handleError<User>('userPresentation'))
      );
  }

  // Fetch user information from the API
  getUserPreferredSchedules(): Observable<PreferredSchedule[]> {
    return this.http.get<PreferredSchedule[]>(this.apiUrl + "/schedules")
      .pipe(
        catchError(this.utilsService.handleError<PreferredSchedule[]>('preferredSchedules', []))
      );
  }

  // Fetch user information from the API
  getPreferredMeetingPlaces(): Observable<PreferredMeetingPlace[]> {
    return this.http.get<PreferredMeetingPlace[]>(this.apiUrl + "/meeting-places")
      .pipe(
        catchError(this.utilsService.handleError<PreferredMeetingPlace[]>('preferredMeetingPlaces', []))
      );
  }
}
