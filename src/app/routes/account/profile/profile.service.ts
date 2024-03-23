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
  private apiUrl = 'http://localhost:8081/api/compte/profil';

  constructor(private http: HttpClient) {}

  getUserInformation(): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/présentation")
    .pipe(
      catchError(this.handleError<User>('getUser'))
    );
  }

  getUserPreferredSchedules(): Observable<PreferredSchedule[]> {
    return this.http.get<PreferredSchedule[]>(this.apiUrl + "/disponibilités")
    .pipe(
      catchError(this.handleError<PreferredSchedule[]>('preferredSchedules', []))
    );
  }

  getPreferredMeetingPlaces(): Observable<PreferredMeetingPlace[]> {
    return this.http.get<PreferredMeetingPlace[]>(this.apiUrl + "/lieux-de-rdv")
    .pipe(
      catchError(this.handleError<PreferredMeetingPlace[]>('referredMeetingPlace', []))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
