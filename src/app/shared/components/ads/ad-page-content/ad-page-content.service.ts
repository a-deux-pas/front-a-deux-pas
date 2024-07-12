import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { Observable, catchError } from 'rxjs';
import { AdDetails } from '../../../models/ad/ad-details.model';
import { API_URL } from '../../../utils/constants/utils-constants';
import { AdCard } from '../../../models/ad/ad-card.model';

@Injectable({
  providedIn: 'root'
})
export class AdPageContentService {
  private contextUrl = `${API_URL}ads/`;

  constructor(private http: HttpClient,private handleErrorService: HandleErrorService) {}

  // Find a specific ad
  getAdById(adId: number, userId: number): Observable<AdDetails> {
    const url = `${this.contextUrl}${adId}/${userId}`
    return this.http.get<AdDetails>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // Fetch a list of ads published by a specific user
  fetchUserAds(userId: number, pageNumber: number, pageSize: number): Observable<AdCard[]> {
    const url = `${this.contextUrl}list/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<AdCard[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // TODO: checker si cette méthode est nécéssaire
  getMyAdsCount(userId: number): Observable<number> {
    const url = `${this.contextUrl}count/${userId}`;
    return this.http.get<number>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // Find ads with a specific category
  getSimilarAds(category: string, publisherId: number, userId?: number): Observable<AdCard[]> {
    const url = `${this.contextUrl}similarAdsList/${category}/${publisherId}/${userId}`
    return this.http.get<AdCard[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
