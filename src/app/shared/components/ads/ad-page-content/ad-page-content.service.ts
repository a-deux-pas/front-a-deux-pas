import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { Observable, catchError } from 'rxjs';
import { API_URL } from '../../../utils/constants/util-constants';
import { AdCard } from '../../../models/ad/ad-card.model';

@Injectable({
  providedIn: 'root'
})
export class AdPageContentService {
  private contextUrl = `${API_URL}ads/`;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  // Find ads with a specific category
  getSimilarAds(category: string, publisherId: number, userId?: number): Observable<AdCard[]> {
    const url = `${this.contextUrl}similarAdsList/${category}/${publisherId}/${userId}`;
    return this.http.get<AdCard[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
