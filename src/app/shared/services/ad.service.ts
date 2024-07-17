import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable, catchError } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { API_URL } from "../utils/constants/util-constants"
import { HandleErrorService } from "./handle-error.service"
import { AdCard } from "../models/ad/ad-card.model"

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private contextUrl = `${API_URL}ads/`;
  private sellerAdPageLoadedSubject = new BehaviorSubject<boolean>(false);
  sellerAdPageLoaded$ = this.sellerAdPageLoadedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  // Fetch the ads that match the filtering criteria passed as query params
  fetchFilteredAds(
    selectedPriceRanges: string[],
    selectedCitiesAndPostalCodes: string[],
    selectedArticleStates: string[],
    selectedCategory: string,
    pageNumber: number,
    pageSize: number,
  ): Observable<AdCard[]> {
    const queryParams = {
      priceRanges: selectedPriceRanges.join(','),
      citiesAndPostalCodes: selectedCitiesAndPostalCodes.join(','),
      articleStates: selectedArticleStates.join(','),
      category: selectedCategory,
      loggedInUserId: Number(localStorage.getItem('userId'))
    };
    return this.http
      .get<AdCard[]>(
        `${this.contextUrl}list?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          params: queryParams,
        }
      ).pipe(
        catchError(this.handleErrorService.handleError)
      );
  }

  // Fetch a list of ads published by a specific user
  fetchUserAds(
    publisherId: number,
    pageNumber: number,
    pageSize: number,
    loggedInUserId: number,
    adId: number | string
  ): Observable<AdCard[]> {
    const url = `${this.contextUrl}adPageContentList/${publisherId}/${loggedInUserId}/${adId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<AdCard[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  isOnSellerAdPageUnLogged(boolean: boolean) {
    this.sellerAdPageLoadedSubject.next(boolean);
  }
}
