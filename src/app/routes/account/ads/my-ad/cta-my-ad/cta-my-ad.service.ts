import { Injectable } from '@angular/core';
import { API_URL } from '../../../../../shared/utils/constants/utils-constants';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from '../../../../../shared/services/handle-error.service';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CtaMyAdService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService) { }
  
    getFavoriteCount(adId: number): Observable<number> {
      const url = `${API_URL}ads/favoriteCount/${adId}`;
      return this.http.get<number>(url).pipe(
        catchError(this.handleErrorService.handleError)
      )
    }
}
