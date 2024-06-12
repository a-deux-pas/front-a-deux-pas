import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PreferredSchedule } from '../../../shared/models/user/preferred-schedule.model';
import { PreferredMeetingPlace } from '../../../shared/models/user/preferred-meeting-place.model';
import { User } from '../../../shared/models/user/user.model';
import { API_URL } from '../../../shared/utils/constants/utils-constants';
import { HandleErrorService } from '../../../shared/services/handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${API_URL}account/profile`;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  // Fetch user information from the API
  getUserPresentation(): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/presentation")
      .pipe(
        catchError(this.handleErrorService.handleError)
      );
  }

  // Fetch user information from the API
  getUserPreferredSchedules(): Observable<PreferredSchedule[]> {
    return this.http.get<PreferredSchedule[]>(this.apiUrl + "/schedules")
      .pipe(
        catchError(this.handleErrorService.handleError)
      );
  }

  // Fetch user information from the API
  getPreferredMeetingPlaces(): Observable<PreferredMeetingPlace[]> {
    return this.http.get<PreferredMeetingPlace[]>(this.apiUrl + "/meeting-places")
      .pipe(
        catchError(this.handleErrorService.handleError)
      );
  }
}
