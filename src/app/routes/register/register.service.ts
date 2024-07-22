import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { API_URL } from '../../shared/utils/constants/utils-constants';
import { Observable, catchError } from 'rxjs';
import { UserProfile } from '../../shared/models/user/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  saveProfile(profile: UserProfile, profilePicFile: File): Observable<any> {
    const profileJson = JSON.stringify(profile);
    const profileBlob = new Blob([profileJson], {
      type: 'application/json'
    });

    // TO DO :: ajouter mot d'explication sur ce qu'est le blob
    // JSON.parse will create a javascript object which is not what your backend is expecting. You need to send it as a JSON file.
    // which is what's created by a blob
    const userProfileData: FormData = new FormData();
    userProfileData.append('profileInfo', profileBlob);
    userProfileData.append('profilePicture', profilePicFile);
    return this.http.patch(`${API_URL}account/create`, userProfileData, {
      responseType: 'text' as 'json'
    }).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }
}
