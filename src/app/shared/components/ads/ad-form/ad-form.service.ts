import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AD_BASE_URL } from '../../../utils/constants/util-constants';

@Injectable({
  providedIn: 'root'
})
export class AdFormService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  createAd(adData: FormData): Observable<any> {
    const url = `${AD_BASE_URL}/create`;
    return this.http.post(url, adData).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  updateAd(adData: FormData): Observable<any> {
    const url = `${AD_BASE_URL}/update`;
    return this.http.put(url, adData).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
