import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HandleErrorService } from './handle-error.service';
import { AD_BASE_URL } from '../utils/constants/util-constants';
import { AdCard } from '../models/ad/ad-card.model';
import { catchError, Observable } from 'rxjs';
import { DisplayManagementService } from './display-management.service';
import { AdDetails } from '../models/ad/ad-details.model';
import { ALERTS } from '../utils/constants/alert-constants';

@Injectable({
  providedIn: 'root'
})
export class AdFavoriteService {
  updateAdsFavoritesList: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private displayManagementService: DisplayManagementService
  ) {}

  getUserFavoritesAd(userId: number, pageNumber: number, pageSize: number): Observable<AdCard[]> {
    const url = `${AD_BASE_URL}/favorites/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<AdCard[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  sendNewAdFavoriteStatus(adId: number, userId: number, isFavorite: boolean): Observable<boolean> {
    const url = `${AD_BASE_URL}/${adId}/favorite/${userId}`;
    return this.http.put<boolean>(url, isFavorite,
      { responseType: 'text' as 'json'}
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  updateAdFavoriteStatus(adId: number, userId: number, isfavorite: boolean, ad: AdCard | AdDetails): void {
    this.sendNewAdFavoriteStatus(adId, userId, isfavorite).subscribe({
      next: () => {
        this.updateAdsFavoritesList.emit(ad);
        if (isfavorite) {
          this.displayManagementService.displayAlert(
            ALERTS.FAVORITES_ADDED_SUCCESS
          );
        } else {
          this.displayManagementService.displayAlert(
            ALERTS.FAVORITES_REMOVED_SUCCESS
          );
        }
      },
      error: () => {
        this.displayManagementService.displayAlert(
          ALERTS.DEFAULT_ERROR
        );
      }
    });
  }
}
