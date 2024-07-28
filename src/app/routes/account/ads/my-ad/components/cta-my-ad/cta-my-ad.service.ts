import { Injectable } from '@angular/core';
import { AD_BASE_URL, MEETING_BASE_URL } from '../../../../../../shared/utils/constants/util-constants';
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
    const url = `${AD_BASE_URL}/favoriteCount/${adId}`;
    return this.http.get<number>(url).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }

  getBuyerAlias(adId: number): Observable<string> {
    const url = `${MEETING_BASE_URL}/${adId}/buyer`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }

  getSaleDate(adId: number): Observable<Date> {
    const url = `${MEETING_BASE_URL}/${adId}/date`;
    return this.http.get<Date>(url).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }

  deleteAd(adId: number): Observable<number> {
    const url = `${AD_BASE_URL}/${adId}`;
    return this.http.delete<number>(url, {
      responseType: 'text' as 'json'
    }).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }
}
