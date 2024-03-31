import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdResponse } from '../../../models/AdResponse.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdFiltersService {
  private baseUrl: string = 'http://localhost:8081/annonces/liste';

  constructor(private http: HttpClient) {}

  // fetch the ads that match the filtering criteria passed as query params
  fetchFilteredAds(
    selectedPriceRanges: string[],
    selectedCitiesAndPostalCodes: string[],
    selectedArticleStates: string[],
    selectedCategory: string,
    pageNumber: number,
    pageSize: number
  ): Observable<AdResponse[]> {
    const queryParams = {
      priceRanges: selectedPriceRanges.join(','),
      citiesAndPostalCodes: selectedCitiesAndPostalCodes.join(','),
      articleStates: selectedArticleStates.join(','),
      category: selectedCategory,
    };
    return this.http.get<AdResponse[]>(
      `${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        params: queryParams,
      }
    );
  }
}
