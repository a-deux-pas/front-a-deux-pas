import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}

  fetchAdsList() {
    return this.http.get('http://localhost:8081/api/list-ads');
  }
}
