import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../services/handle-error.service';
import { UserPresentation } from '../../models/user/user-presentation.model';
import { USER_BASE_URL } from '../../utils/constants/util-constants';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPresentationService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getUserPresentation(userAlias: string): Observable<UserPresentation> {
    return this.http.get<UserPresentation>(`${USER_BASE_URL}/${userAlias}/presentation`)
    .pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
