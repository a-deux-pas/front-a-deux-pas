import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { PreferredSchedule } from '../../../shared/models/preferred-schedule.model';
import { PreferredMeetingPlace } from '../../../shared/models/preferred-meeting-place.model';
import { User } from '../../../shared/models/user.model';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8081/api/account/profile';

  constructor(private http: HttpClient) {}

   // Fetch user information from the API
  getUserPresentation(): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/presentation")
    .pipe(
      catchError(this.handleError<User>('userPresentation'))
    );
  }

  // Fetch user information from the API
  getUserPreferredSchedules(): Observable<PreferredSchedule[]> {
    return this.http.get<PreferredSchedule[]>(this.apiUrl + "/schedules")
    .pipe(
      catchError(this.handleError<PreferredSchedule[]>('preferredSchedules', []))
    );
  }

  // Fetch user information from the API
  getPreferredMeetingPlaces(): Observable<PreferredMeetingPlace[]> {
    return this.http.get<PreferredMeetingPlace[]>(this.apiUrl + "/meeting-places")
    .pipe(
      catchError(this.handleError<PreferredMeetingPlace[]>('preferredMeetingPlaces', []))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'profile', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
}
