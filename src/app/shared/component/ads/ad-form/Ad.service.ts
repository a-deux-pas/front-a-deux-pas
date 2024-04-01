import { Injectable } from "@angular/core"
import { Observable, retry } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Ad } from "../../../../../model/ad.model"
import { API_URL } from "../../../utils/constants"

@Injectable({
    providedIn: 'root'
})
export class AdService {

    constructor(
        private http: HttpClient) { }

    postAd(ad: Ad): Observable<any> {
        const url = `${API_URL}annonce/creer-une-annonce`
        return this.http.post(url, ad)
            .pipe(
                retry(1)
            )
    }
}