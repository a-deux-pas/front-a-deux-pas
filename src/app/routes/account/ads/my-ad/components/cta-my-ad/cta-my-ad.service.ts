import { Injectable } from '@angular/core';
import { API_URL } from '../../../../../../shared/utils/constants/util-constants';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from '../../../../../../shared/services/handle-error.service';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CtaMyAdService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getFavoriteCount(adId: number): Observable<number> {
    const url = `${API_URL}ads/favoriteCount/${adId}`;
    return this.http.get<number>(url).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }

  getBuyerAlias(adId: number): Observable<string> {
    const url = `${API_URL}meetings/${adId}/buyer`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }

  getSaleDate(adId: number): Observable<Date> {
    const url = `${API_URL}meetings/${adId}/date`;
    return this.http.get<Date>(url).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }

  deleteAd(adId: number): Observable<number> {
    const url = `${API_URL}ads/${adId}`;
    return this.http.delete<number>(url, {
      responseType: 'text' as 'json'
    }).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }
}
