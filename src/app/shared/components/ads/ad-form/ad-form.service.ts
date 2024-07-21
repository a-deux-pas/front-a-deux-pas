import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { API_URL } from '../../../utils/constants/util-constants';
import { AdDetails } from '../../../models/ad/ad-details.model';

@Injectable({
  providedIn: 'root'
})
export class AdFormService {
  private contextUrl = `${API_URL}ads/`;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  createAd(ad: AdDetails): Observable<any> {
    const url = `${this.contextUrl}create`;
    return this.http.post(url, ad).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  updateAd(ad: AdDetails): Observable<any> {
    const url = `${this.contextUrl}update`;
    return this.http.put(url, ad).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
