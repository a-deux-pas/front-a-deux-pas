import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { API_URL } from '../../../utils/constants/utils-constants';
import { AdDetails } from '../../../models/ad/ad-details.model';

@Injectable({
  providedIn: 'root'
})
export class AdFormService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  postAd(ad: AdDetails, adPicFile: File[]): Observable<AdDetails> {
    const url = `${API_URL}ads/create`
    const adJson = JSON.stringify(ad)
    const adBlob = new Blob([adJson], {
      type: 'application/json'
    })
    const adData: FormData = new FormData();
    adData.append('adInfo', adBlob);
    adPicFile.forEach((file, index) => {
      adData.append(`adPicture-${index + 1}`, file);
    });
    return this.http.post<AdDetails>(url, adData).pipe(
      catchError(this.handleErrorService.handleError)
    );
  };
}
