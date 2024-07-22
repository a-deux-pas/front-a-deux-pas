import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { Observable, catchError } from 'rxjs';
import { API_URL } from '../../../utils/constants/utils-constants';
import { AdCard } from '../../../models/ad/ad-card.model';
import { Ad } from '../../../models/ad/ad.model';
import { AdDetails } from '../../../models/ad/ad-details.model';

@Injectable({
  providedIn: 'root'
})
export class AdPageContentService {
  private contextUrl = `${API_URL}ads/`;

  constructor(private http: HttpClient, private handleErrorService: HandleErrorService) { }

  // Find a specific ad
  getAdById(adId: number): Observable<AdDetails> {
    const url = `${this.contextUrl}${adId}`
    return this.http.get<AdDetails>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // Fetch a list of ads published by a specific user
  fetchUserAds(publisherId: number, pageNumber: number, pageSize: number, loggedInUserId: number, adId: number): Observable<AdCard[]> {
    const url = `${this.contextUrl}adPageContentList/${publisherId}/${loggedInUserId}/${adId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<AdCard[]>(url).pipe(
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
