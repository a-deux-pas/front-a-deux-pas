import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { API_URL } from '../utils/constants/utils-constants';
import { jwtDecode } from 'jwt-decode';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // A BehaviorSubject to hold and emit the current login status
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(public http: HttpClient, private router: Router,  private handleErrorService: HandleErrorService) {}

  isEmailAddressAlreadyExist(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}api/check-email`, {
      params: { email }
    }).pipe(
        catchError(this.handleErrorService.handleError))
  }

  isPasswordMatchesEmail(email: string, password: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}api/check-password`, {
      params: { email, password }
    }).pipe(
        catchError(this.handleErrorService.handleError))
  }

  isAliasAlreadyExist(alias: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}api/check-alias`, {
      params: { alias }
    }).pipe(
        catchError(this.handleErrorService.handleError))
  }

  // Method to check if a token is present in localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Function to extract email of user from the JWT token
  extractIdFromToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.sub;
  }

  // Method to handle user registration and login
  auth(email: string, password: string, endpoint: string): Observable<any> {
    return this.http
      .post<any>(
        `${API_URL}api/${endpoint}`,
        { email, password },
        { responseType: 'text' as 'json' } // Response type expected
      )
      .pipe(
        tap((data: any) => {
          const token = data;
          // If token received, store it in local storage
          if (token) {
            localStorage.setItem('token', token);
            const userId = this.extractIdFromToken(token);
            localStorage.setItem('userId', userId);
            this.loggedIn.next(true);
          } else {
            // Throw error if no token received
            throw new Error('No token received');
          }
        }),
        // Log error and return it as observable
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);
          if (error.status === 401) {
            return throwError(() => 'Email or passeword not valid');
          }
          return throwError(() => error);
        })
      );
  }

  // Method to check if the user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Method to log out the user
  logout() {
    // Remove token and userEmail from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Update login status to false
    this.loggedIn.next(false);
    // Navigate to the home page
    this.router.navigate(['/']);
  }
}
