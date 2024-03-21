import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})

export class UtilsService {

    constructor(
        //pourra être utile pour gerer les token ou les caches
        // private storageService: StorageService,
        private http: HttpClient) {}
    

    getJsonHeader() {
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
          }),
        //   withCredentials: true
        }
      }
}

