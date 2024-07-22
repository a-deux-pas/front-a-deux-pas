import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { API_URL } from '../../shared/utils/constants/util-constants';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { UserPresentation } from '../../shared/models/user/user-presentation.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sellerSubject = new BehaviorSubject<UserPresentation | null>(null);
  seller$ = this.sellerSubject.asObservable();

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getUserAliasAndLocation(userId: number): Observable<UserPresentation> {
    const url = `${API_URL}users/${userId}/alias-and-location`;
    return this.http.get<UserPresentation>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  setSeller(seller: UserPresentation) {
    this.sellerSubject.next(seller);
  }
}
