import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HandleErrorService } from './handle-error.service';
import { API_URL } from '../utils/constants/utils-constants';
import { AdCard } from '../models/ad/ad-card.model';
import { catchError, Observable } from 'rxjs';
import { AlertMessage } from '../models/enum/alert-message.enum';
import { AlertType } from '../models/alert.model';
import { DisplayManagementService } from './display-management.service';
import { AdDetails } from '../models/ad/ad-details.model';

@Injectable({
  providedIn: 'root'
})
export class AdFavoriteService {
  contextUrl = `${API_URL}ads/`;
  updateAdsFavoritesList: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private displayManagementService: DisplayManagementService
  ) {}

  getUserFavoritesAd(userId: number, pageNumber: number, pageSize: number): Observable<AdCard[]> {
    const url = `${this.contextUrl}favorites/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<AdCard[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  sendNewAdFavoriteStatus(adId: number, userId: number, isFavorite: boolean): Observable<boolean> {
    console.log("ajout en favori", adId);
    const url = `${this.contextUrl}${adId}/favorite/${userId}`;
    return this.http.put<boolean>(url, isFavorite,
      { responseType: 'text' as 'json'}
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  updateAdFavoriteStatus(adId: number, userId: number, isfavorite: boolean, ad: AdCard | AdDetails): void {
    this.sendNewAdFavoriteStatus(adId, userId, isfavorite).subscribe({
      next: (response) => {
        console.log(response);
        this.updateAdsFavoritesList.emit(ad);
        if (isfavorite) {
          this.displayManagementService.displayAlert({
            message: AlertMessage.FAVORITES_ADDED_SUCCESS,
            type: AlertType.SUCCESS,
          });
        } else {
          this.displayManagementService.displayAlert({
            message: AlertMessage.FAVORITES_REMOVED_SUCCESS,
            type: AlertType.SUCCESS,
          });
        }
      },
      error: (error) => {
        console.error('Error:', error);
        this.displayManagementService.displayAlert({
          message: AlertMessage.DEFAULT_ERROR,
          type: AlertType.ERROR,
        });
      }
    });
  }
}
