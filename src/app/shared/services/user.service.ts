import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from './handle-error.service';
import { UserPresentation } from '../models/user/user-presentation.model';
import { API_URL } from '../utils/constants/utils-constants';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getUserAliasAndLocation(userId: number): Observable<UserPresentation> {
    const url = `${API_URL}users/${userId}/alias-and-location`;
    return this.http.get<UserPresentation>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
