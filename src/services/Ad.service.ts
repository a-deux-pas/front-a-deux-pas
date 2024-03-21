import { Injectable } from "@angular/core"
import { Observable, retry } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Ad } from "../model/ad.model"

@Injectable({
    providedIn: 'root'
})
export class AdService {

    constructor(
        private http: HttpClient) { }


    postAd(ad: Ad): Observable<any> {
        const url = `http://localhost:8081/annonce/creer-une-annonce`
        return this.http.post(url, ad)
            .pipe(
                retry(1)
            )
    }
}