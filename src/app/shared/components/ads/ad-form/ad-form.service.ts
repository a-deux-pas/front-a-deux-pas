import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { API_URL } from '../../../utils/constants/utils-constants';
import { Ad } from '../../../models/ad/ad.model';
import { AdDetails } from '../../../models/ad/ad-details.model';

@Injectable({
  providedIn: 'root'
})
export class AdFormService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  postAd(ad: AdDetails): Observable<any> {
    const url = `${API_URL}ads/create`
    return this.http.post(url, ad).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
