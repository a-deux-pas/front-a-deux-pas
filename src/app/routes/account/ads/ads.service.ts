import { Injectable } from '@angular/core';
import { API_URL } from '../../../shared/utils/constants/utils-constants';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from '../../../shared/services/handle-error.service';
import { catchError, Observable } from 'rxjs';
import { AdCard } from '../../../shared/models/ad/ad-card.model';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private contextUrl = `${API_URL}ads/`;

  constructor(private http: HttpClient, private handleErrorService: HandleErrorService) { }

  // Fetch a list of ads published by a specific user
  fetchUserAds(userId: number, pageNumber: number, pageSize: number): Observable<AdCard[]> {
    const url = `${this.contextUrl}adTablist/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<AdCard[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
