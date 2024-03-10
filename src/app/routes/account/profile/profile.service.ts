import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreferredSchedule } from '../../../shared/models/preferred-schedule.model';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getUserPreferredSchedule(): Observable<PreferredSchedule[]> {
    return this.http.get<PreferredSchedule[]>(this.apiUrl + "/compte/profil");
  }

}
