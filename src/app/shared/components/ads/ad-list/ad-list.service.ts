import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomePageAd } from '../../../models/HomePageAd.model';

@Injectable({
  providedIn: 'root',
})
export class AdListService {
  constructor(private http: HttpClient) {}

  fetchAdsList(): Observable<HomePageAd[]> {
    return this.http.get<HomePageAd[]>('http://localhost:8081/annonces/liste');
  }
}
