import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdResponse } from '../../../models/ad-response.model';

@Injectable({
  providedIn: 'root',
})
export class AdListService {
  private baseUrl: string = 'http://localhost:8081/users';

  constructor(private http: HttpClient) {}

  fetchCitiesAndPostalCodes(): Observable<AdResponse[]> {
    return this.http.get<AdResponse[]>(`${this.baseUrl}/citiesAndPostalCodes`);
  }
}
