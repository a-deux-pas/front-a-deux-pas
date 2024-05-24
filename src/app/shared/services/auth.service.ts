import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient, private router: Router) {}

  // Method to handle user login
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        `http://localhost:8081/login`, // API endpoint for login
        { email, password },
        { responseType: 'text' as 'json' } // Response type expected
      )
      .pipe(
        tap((data: any) => {
          const token = data;
          console.log(token);
          // If token received, store it in local storage and navigate to 'homeconnecte'
          if (token) {
            localStorage.setItem('token', token);
          } else {
            // Throw error if no token received
            throw new Error('No token received');
          }
        }),

        // Log error and return it as observable
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);
          if (error.status === 401) {
            return throwError(() => 'Email et/ou mot de passe incorrect(s).');
          }
          return throwError(() => error);
        })
      );
  }

  // Method to check if user is logged in
  isLoggedIn(): Observable<boolean> {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    // Check if token exists to determine if user is logged in
    const isAuthenticated: boolean = token !== null;

    // Return an observable emitting the value of isAuthenticated
    // Use 'of()' to create an observable from the value of isAuthenticated
    return of(isAuthenticated);
  }
}
