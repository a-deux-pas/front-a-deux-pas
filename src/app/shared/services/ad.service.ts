import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable, catchError } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { API_URL } from "../utils/constants/util-constants"
import { HandleErrorService } from "./handle-error.service"
import { AdCard } from "../models/ad/ad-card.model"
import { AdDetails } from "../models/ad/ad-details.model"

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private contextUrl = `${API_URL}ads/`;
  private sellerAdPageLoadedSubject = new BehaviorSubject<boolean>(false);
  sellerAdPageLoaded$ = this.sellerAdPageLoadedSubject.asObservable();
  private adSubject = new BehaviorSubject<AdDetails | null>(null);
  myAd$ = this.adSubject.asObservable();

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

  // Find a specific ad
  getAdById(adId: number, userId: number): Observable<AdDetails> {
    const url = `${this.contextUrl}${adId}/${userId}`
    return this.http.get<AdDetails>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  setAd(myAd: AdDetails) {
    this.adSubject.next(myAd);
  }

  isOnSellerAdPageUnLogged(boolean: boolean) {
    this.sellerAdPageLoadedSubject.next(boolean);
  }
}
