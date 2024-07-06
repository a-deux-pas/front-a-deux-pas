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
  private apiUrl = `${API_URL}account/profile`;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  // Fetch user's information from the API
  getUserPresentation(userId: string): Observable<UserPresentation> {
    return this.http.get<UserPresentation>(this.apiUrl + "/presentation", {
      params: { userId }
    }).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // Fetch user's preferred schedules from the API
  getUserPreferredSchedules(userId: string): Observable<PreferredSchedule[]> {
    return this.http.get<PreferredSchedule[]>(this.apiUrl + "/schedules", {
      params: { userId }
    }).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // Fetch user user's preferred meeting places from the API
  getPreferredMeetingPlaces(userId: string): Observable<PreferredMeetingPlace[]> {
    return this.http.get<PreferredMeetingPlace[]>(this.apiUrl + "/meeting-places", {
      params: { userId }
    }).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
