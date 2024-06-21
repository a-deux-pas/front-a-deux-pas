import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable, Subject, catchError } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Ad } from "../../shared/models/ad/ad.model"
import { API_URL } from "../../shared/utils/constants/utils-constants"
import { AdPostResponse } from "../../shared/models/ad/ad-post-response.model"
import { HandleErrorService } from "../../shared/services/handle-error.service"

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private contextUrl = `${API_URL}ads/`;
  // TO DO :: checker mise à jour de sellerAd si connexion depuis cette page
  private sellerAdPageLoadedSubject = new BehaviorSubject<boolean>(false);
  sellerAdPageLoaded$ = this.sellerAdPageLoadedSubject.asObservable();

  constructor(
      private http: HttpClient,
      private handleErrorService: HandleErrorService) { }

  postAd(ad: Ad): Observable<any> {
    const url = `${this.contextUrl}create`
    return this.http.post(url, ad)
      .pipe(
        catchError(this.handleErrorService.handleError)
      )
  }

  findAdById(adId: number): Observable<AdPostResponse> {
    const url = `${this.contextUrl}${adId}`
    return this.http.get<AdPostResponse>(url)
      .pipe(
        catchError(this.handleErrorService.handleError)
      );
  }

  fetchMoreAds(userId: number, pageNumber: number, pageSize: number): Observable<AdPostResponse[]> {
      const url = `${this.contextUrl}list/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
      return this.http.get<AdPostResponse[]>(url)
          .pipe(
            catchError(this.handleErrorService.handleError)
          )
  }

  getMyAdsCount(userId: number): Observable<number> {
      const url = `${this.contextUrl}count/${userId}`;
      return this.http.get<number>(url)
          .pipe(
            catchError(this.handleErrorService.handleError)
          )
  }

  getSimilarAds(category: string, publisherId: number, userId?: number): Observable<AdPostResponse[]> {
      const url = `${this.contextUrl}similarAdsList/${category}/${publisherId}/${userId}`
      return this.http.get<AdPostResponse[]>(url)
          .pipe(
            catchError(this.handleErrorService.handleError)
          )
  }

  findMyAds(userId: number): Observable<AdPostResponse[]> {
    const url = `${this.contextUrl}list/${userId}`
    return this.http.get<AdPostResponse[]>(url)
      .pipe(
        catchError(this.handleErrorService.handleError)
      );
  }

  isOnSellerAdPageUnLogged(boolean: boolean) {
    this.sellerAdPageLoadedSubject.next(boolean);
  }
}
