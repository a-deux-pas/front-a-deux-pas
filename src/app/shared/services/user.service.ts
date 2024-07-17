import { Injectable } from '@angular/core';
import { API_URL } from '../utils/constants/utils-constants';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Observable, catchError } from 'rxjs';
import { Seller } from '../models/user/checkout-seller.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private contextUrl = `${API_URL}users/`;

  private checkoutSeller: any;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  // Seller state management methods
  setCheckoutseller(seller: any): void {
    this.checkoutSeller = seller;
  }
  getCheckoutSeller(): any {
    return this.checkoutSeller;
  }

  fetchUserByAlias(alias: string): Observable<any> {
    const url = `${this.contextUrl}${alias}`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleErrorService.handleError));
  }
}
