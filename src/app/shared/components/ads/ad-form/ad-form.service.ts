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

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  postAd(adData: FormData): Observable<AdDetails> {
    const url = `${API_URL}ads/create`
    
    return this.http.post<AdDetails>(url, adData).pipe(
      catchError(this.handleErrorService.handleError)
    );
  };
}
