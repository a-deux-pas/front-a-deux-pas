import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../../shared/services/handle-error.service';
import { USER_BASE_URL } from '../../../../shared/utils/constants/util-constants';
import { Observable, catchError } from 'rxjs';
import { UserPresentation } from '../../../../shared/models/user/user-presentation.model';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getSellersNearby(userId: number): Observable<UserPresentation[]> {
    const url = `${USER_BASE_URL}/${userId}/nearby-sellers`;
    return this.http.get<UserPresentation[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
