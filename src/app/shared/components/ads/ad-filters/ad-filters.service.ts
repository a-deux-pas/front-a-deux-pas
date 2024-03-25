import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomePageAd } from '../../../models/HomePageAd.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdFiltersService {
  constructor(private http: HttpClient) {}

  // fetch the ads that match the filtering criteria passed as query params
  fetchFilteredAds(
    selectedPriceRanges: string[],
    selectedCitiesAndPostalCodes: string[],
    selectedArticleStates: string[],
    selectedCategory: string
  ): Observable<HomePageAd[]> {
    const queryParams = {
      priceRanges: selectedPriceRanges.join(','),
      citiesAndPostalCodes: selectedCitiesAndPostalCodes.join(','),
      articleStates: selectedArticleStates.join(','),
      category: selectedCategory,
    };
    return this.http.get<HomePageAd[]>('http://localhost:8081/annonces/liste', {
      params: queryParams,
    });
  }
}
