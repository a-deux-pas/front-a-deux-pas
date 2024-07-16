import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { API_URL } from '../../shared/utils/constants/util-constants';
import { Observable, catchError } from 'rxjs';
import { UserPresentation } from '../../shared/models/user/user-presentation.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

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
