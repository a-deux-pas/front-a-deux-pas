import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getUserPreferredSchedule(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/compte/profil/" + id);
  }

}
