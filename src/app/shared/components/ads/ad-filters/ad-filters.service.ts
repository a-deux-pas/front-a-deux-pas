import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../utils/constants/util-constants';
import { HandleErrorService } from '../../../services/handle-error.service';
import { CityAndPostalCodeResponse } from '../../../models/user/city-and-postal-code-response.model';

@Injectable({
  providedIn: 'root',
})
export class AdFiltersService {
  private citiesAndPostalCodesUrl: string = `${API_URL}users/cities-and-postal-codes`;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  // fetch all the unique cities and postal codes for display in the 'Ville' filter at component load
  fetchCitiesAndPostalCodes(): Observable<CityAndPostalCodeResponse[]> {
    return this.http
      .get<CityAndPostalCodeResponse[]>(this.citiesAndPostalCodesUrl)
      .pipe(
        catchError(this.handleErrorService.handleError)
      );
  }
}
