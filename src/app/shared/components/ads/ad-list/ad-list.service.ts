import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdResponse } from '../../../models/AdResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AdListService {
  private baseUrl: string = 'http://localhost:8081/utilisateurs';

  constructor(private http: HttpClient) {}

  fetchCitiesAndPostalCodes(): Observable<AdResponse[]> {
    return this.http.get<AdResponse[]>(`${this.baseUrl}/citiesAndPostalCodes`);
  }
}
