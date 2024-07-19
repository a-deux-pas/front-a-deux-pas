import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { API_URL } from '../../shared/utils/constants/util-constants';
import { Observable, catchError } from 'rxjs';
import { UserAliasAndLocation } from '../models/user/user-alias-and-location.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getUserAliasAndLocation(userId: number): Observable<UserAliasAndLocation> {
    const url = `${API_URL}users/${userId}/alias-and-location`;
    return this.http.get<UserAliasAndLocation>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
