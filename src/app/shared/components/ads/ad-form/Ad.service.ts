import { Injectable } from "@angular/core"
import { Observable, retry } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Ad } from "../../../../../model/ad.model"
import { API_URL } from "../../../utils/constants"
import { AdResponse } from "../../../../../model/adResponse.model"

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

    findAdById(adId: number): Observable<AdResponse> {
        console.log('adId:: ', adId)
        const url = `${this.contextUrl}${adId}`
        return this.http.get<AdResponse>(url)
            .pipe(
                retry(1)
            );
    }
}