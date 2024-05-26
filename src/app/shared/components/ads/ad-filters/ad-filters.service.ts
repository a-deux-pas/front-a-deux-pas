import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdHomeResponse } from '../../../models/ad/ad-home-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdFiltersService {
  private baseUrl: string = 'http://localhost:8081/api/ads/list';

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
      `${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        params: queryParams,
      }
    );
  }
}
