import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { API_URL } from '../../../utils/constants/util-constants';
import { Ad } from '../../../models/ad/ad.model';

@Injectable({
  providedIn: 'root'
})
export class AdFormService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  postAd(ad: Ad): Observable<any> {
    const url = `${API_URL}ads/create`
    return this.http.post(url, ad).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
