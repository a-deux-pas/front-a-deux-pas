import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { USER_BASE_URL } from '../../../utils/constants/util-constants';
import { HandleErrorService } from '../../../services/handle-error.service';
import { UserAliasAndLocation } from '../../../models/user/user-alias-and-location.model';

@Injectable({
  providedIn: 'root',
})
export class AdFiltersService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  // fetch all the unique cities and postal codes for display in the 'Ville' filter at component load
  fetchCitiesAndPostalCodes(): Observable<UserAliasAndLocation[]> {
    return this.http
      .get<UserAliasAndLocation[]>(`${USER_BASE_URL}/cities-and-postal-codes`)
      .pipe(
        catchError(this.handleErrorService.handleError)
      );
  }
}
