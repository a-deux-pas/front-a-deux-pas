import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { ACCOUNT_BASE_URL } from '../../shared/utils/constants/util-constants';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  saveProfile(userProfileData: FormData): Observable<any> {
    return this.http
      .patch(`${ACCOUNT_BASE_URL}/create`, userProfileData, {
        responseType: 'text' as 'json',
      })
      .pipe(catchError(this.handleErrorService.handleError));
  }
}
