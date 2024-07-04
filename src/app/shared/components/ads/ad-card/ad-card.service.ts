import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../../services/handle-error.service';
import { API_URL } from '../../../utils/constants/utils-constants';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdCardService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  updateAdFavoriteStatus(adId: number, userId: number, isFavorite: boolean): Observable<boolean> {
    const url = `${API_URL}ads/${adId}/favorite/${userId}`;
    return this.http.put<boolean>(url,
      { isFavorite },
      { responseType: 'text' as 'json'}
    ).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
