import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdHomeResponse } from '../../../models/ad/ad-home-response.model';

@Injectable({
  providedIn: 'root',
})
export class AdListService {
  private baseUrl: string = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {}

  fetchCitiesAndPostalCodes(): Observable<AdHomeResponse[]> {
    return this.http.get<AdHomeResponse[]>(
      `${this.baseUrl}/cities-and-postal-codes`
    );
  }
}
