import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable, catchError } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { AD_BASE_URL } from "../utils/constants/util-constants"
import { HandleErrorService } from "./handle-error.service"
import { AdCard } from "../models/ad/ad-card.model"
import { AdDetails } from "../models/ad/ad-details.model"

@Injectable({
  providedIn: 'root',
})
export class AdService {
  private sellerAdPageLoadedSubject = new BehaviorSubject<boolean>(false);
  sellerAdPageLoaded$ = this.sellerAdPageLoadedSubject.asObservable();
  private adSubject = new BehaviorSubject<AdDetails | null>(null);
  myAd$ = this.adSubject.asObservable();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  setAd(myAd: AdDetails) {
    this.adSubject.next(myAd);
  }

  // Find a specific ad
  getAdById(adId: number, userId: number): Observable<AdDetails> {
    const url = `${AD_BASE_URL}/${adId}/${userId}`;
    return this.http.get<AdDetails>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  // Fetch the ads that match the filtering criteria passed as query params
  fetchFilteredAds(
    selectedPriceRanges: string[],
    selectedCitiesAndPostalCodes: string[],
    selectedArticleStates: string[],
    selectedCategory: string,
    pageNumber: number,
    pageSize: number
  ): Observable<AdCard[]> {
    const queryParams = {
      priceRanges: selectedPriceRanges.join(','),
      citiesAndPostalCodes: selectedCitiesAndPostalCodes.join(','),
      articleStates: selectedArticleStates.join(','),
      category: selectedCategory,
      loggedInUserId: Number(localStorage.getItem('userId')),
    };
    return this.http
      .get<AdCard[]>(
        `${AD_BASE_URL}/list?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          params: queryParams,
        }
      )
      .pipe(catchError(this.handleErrorService.handleError));
  }

  // Fetch a list of ads published by a specific user
  fetchUserAds(
    publisherId: number,
    loggedInUserId: number,
    adId: number | string,
    pageNumber: number,
    pageSize: number
  ): Observable<AdCard[]> {
    const url = `${AD_BASE_URL}/adPageContentList/${publisherId}/${loggedInUserId}/${adId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<AdCard[]>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  isOnSellerAdPageUnLogged(boolean: boolean) {
    this.sellerAdPageLoadedSubject.next(boolean);
  }
}
