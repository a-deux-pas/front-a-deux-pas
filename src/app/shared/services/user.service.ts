import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { API_URL } from '../../shared/utils/constants/util-constants';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { UserAliasAndLocation } from '../models/user/user-alias-and-location.model';
import { UserPresentation } from '../models/user/user-presentation.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private contextUrl = `${API_URL}users/`;
  private sellerSubject = new BehaviorSubject<UserPresentation | null>(null);
  seller$ = this.sellerSubject.asObservable();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getUserAliasAndLocation(userId: number): Observable<UserAliasAndLocation> {
    const url = `${API_URL}users/${userId}/alias-and-location`;
    return this.http
      .get<UserAliasAndLocation>(url)
      .pipe(catchError(this.handleErrorService.handleError));
  }

  setSeller(seller: UserPresentation) {
    this.sellerSubject.next(seller);
  }

  fetchUserByAlias(alias: string): Observable<any> {
    const url = `${this.contextUrl}${alias}`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleErrorService.handleError));
  }
}
