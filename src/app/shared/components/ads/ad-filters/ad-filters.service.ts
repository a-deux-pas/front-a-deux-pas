import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdHomeResponse } from '../../../models/ad/ad-home-response.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../utils/constants/utils-constants';

@Injectable({
  providedIn: 'root',
})
export class AdFiltersService {
  private filteredAdsListUrl: string = `${API_URL}api/ads/list`;
  private citiesAndPostalCodesUrl: string = `${API_URL}api/users`;

  constructor(private http: HttpClient) {}

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
    return this.http.get<AdHomeResponse[]>(
      `${this.filteredAdsListUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        params: queryParams,
      }
    );
  }

  fetchCitiesAndPostalCodes(): Observable<AdHomeResponse[]> {
    return this.http.get<AdHomeResponse[]>(
      `${this.citiesAndPostalCodesUrl}/cities-and-postal-codes`
    );
  }
}
