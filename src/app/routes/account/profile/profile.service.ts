import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PreferredSchedule } from '../../../shared/models/user/preferred-schedule.model';
import { PreferredMeetingPlace } from '../../../shared/models/user/preferred-meeting-place.model';
import { UserPresentation } from '../../../shared/models/user/user-presentation.model';
import { API_URL } from '../../../shared/utils/constants/utils-constants';
import { HandleErrorService } from '../../../shared/services/handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private accountUrl = `${API_URL}account/profile`;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  // Fetch user's information from the API
  getUserPresentation(userId: number): Observable<UserPresentation> {
    return this.http.get<UserPresentation>(this.accountUrl + `/${userId}/presentation`)
    .pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // Fetch user's preferred schedules from the API
  getUserPreferredSchedules(userId: number): Observable<PreferredSchedule[]> {
    return this.http.get<PreferredSchedule[]>(this.accountUrl + `/${userId}/schedules`)
    .pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // Fetch user user's preferred meeting places from the API
  getPreferredMeetingPlaces(userId: number): Observable<PreferredMeetingPlace[]> {
    return this.http.get<PreferredMeetingPlace[]>(this.accountUrl + `/${userId}/meeting-places`)
    .pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
