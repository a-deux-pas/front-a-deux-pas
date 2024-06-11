import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AdHomeResponse } from '../../../models/ad/ad-home-response.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../utils/constants/utils-constants';
import { HandleErrorService } from '../../../services/handle-error.service';
import { CityAndPostalCodeResponse } from '../../../models/user/city-and-postal-code-response.model';

@Injectable({
  providedIn: 'root',
})
export class AdFiltersService {
  private filteredAdsListUrl: string = `${API_URL}api/ads/list`;
  private citiesAndPostalCodesUrl: string = `${API_URL}api/users/cities-and-postal-codes`;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  // fetch the ads that match the filtering criteria passed as query params
  fetchFilteredAds(
    selectedPriceRanges: string[],
    selectedCitiesAndPostalCodes: string[],
    selectedArticleStates: string[],
    selectedCategory: string,
    pageNumber: number,
    pageSize: number
  ): Observable<AdHomeResponse[]> {
    const queryParams = {
      priceRanges: selectedPriceRanges.join(','),
      citiesAndPostalCodes: selectedCitiesAndPostalCodes.join(','),
      articleStates: selectedArticleStates.join(','),
      category: selectedCategory,
    };
    return this.http
      .get<AdHomeResponse[]>(
        `${this.filteredAdsListUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          params: queryParams,
        }
      )
      .pipe(
        catchError(
          this.handleErrorService.handleError<AdHomeResponse[]>(
            'fetchFilteredAds'
          )
        )
      );
  }

  // fetch all the unique cities and postal codes for display in the 'Ville' filter at component load
  fetchCitiesAndPostalCodes(): Observable<CityAndPostalCodeResponse[]> {
    return this.http
      .get<CityAndPostalCodeResponse[]>(this.citiesAndPostalCodesUrl)
      .pipe(
        catchError(
          this.handleErrorService.handleError<CityAndPostalCodeResponse[]>(
            'fetchCitiesAndPostalCodes'
          )
        )
      );
  }
}
