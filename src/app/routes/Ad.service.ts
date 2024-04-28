import { Injectable } from "@angular/core"
import { Observable, retry } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Ad } from "../shared/models/ad/ad.model"
import { API_URL } from "../shared/utils/constants/utilsConstants"
import { AdPostResponse } from "../shared/models/ad/adPostResponse.model"

@Injectable({
    providedIn: 'root'
})
export class AdService {

    private contextUrl = `${API_URL}ad/`;

    constructor(
        private http: HttpClient) { }

    postAd(ad: Ad): Observable<any> {
        const url = `${this.contextUrl}create`
        return this.http.post(url, ad)
            .pipe(
                retry(1)
            )
    }

    findAdById(adId: number): Observable<AdPostResponse> {
        console.log('adId:: ', adId)
        const url = `${this.contextUrl}${adId}`
        return this.http.get<AdPostResponse>(url)
            .pipe(
                retry(1)
            );
    }
}
