import { Injectable } from "@angular/core"
import { Observable, catchError, of } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Ad } from "../shared/models/ad/ad.model"
import { API_URL } from "../shared/utils/constants/utilsConstants"
import { AdPostResponse } from "../shared/models/ad/ad-post-response.model"

@Injectable({
    providedIn: 'root'
})
export class AdService {

    private contextUrl = `${API_URL}ads/`;

    constructor(
        private http: HttpClient) { }

    postAd(ad: Ad): Observable<any> {
        const url = `${this.contextUrl}create`
        return this.http.post(url, ad)
            .pipe(
                catchError(this.handleError<any[]>('postAd'))
            )
    }

    findAdById(adId: number): Observable<AdPostResponse> {
        const url = `${this.contextUrl}${adId}`
        return this.http.get<AdPostResponse>(url)
            .pipe(
                catchError(this.handleError<AdPostResponse>('getAd'))
            );
    }

    findMyAds(userId: number): Observable<AdPostResponse[]> {
        const url = `${this.contextUrl}list/${userId}`
        return this.http.get<AdPostResponse[]>(url)
            .pipe(
                catchError(this.handleError<any[]>('getAdsList'))
            )
    }

    //TODO : we'll be probably put in some utilsService
    /**
    * Handle Http operation that failed.
    * Let the app continue.
    *
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'ad', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
