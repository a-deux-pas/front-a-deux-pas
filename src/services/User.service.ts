import { Injectable } from "@angular/core"
import { Observable, retry } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { User } from "../model/user.model"

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient) {}

    
        findUser(email: string | null): Observable<any> {
            const url = `http://localhost:8081/utilisateur/mbardan@email.ro`;
            return this.http.get(url)
                .pipe(
                    retry(1)
                );
        }
}