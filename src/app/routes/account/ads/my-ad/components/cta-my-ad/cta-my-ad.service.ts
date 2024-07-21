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

  // TO DO: ajouter méthode Back une fois la table transaction implementée
  getBuyerAlias(adId: number): Observable<number> {
    const url = `${API_URL}ads/buyer/${adId}`;
    return this.http.get<number>(url).pipe(
      catchError(this.handleErrorService.handleError)
    )
  }

   // TO DO: ajouter méthode Back une fois la table meeting est implémenté
  getSaleDate(adId: number): Observable<number> {
    const url = `${API_URL}ads/saleDate/${adId}`;
    return this.http.get<number>(url).pipe(
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
