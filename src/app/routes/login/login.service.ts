import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log('je suis dans le service ');

    return this.http
      .post<any>(
        `http://localhost:8081/login`,
        { email, password },
        { responseType: 'text' as 'json' }
      )
      .pipe(
        tap((data: any) => {
          const response = data;
          console.log('Response:', response);
          if (response) {
            localStorage.setItem('token', response);
          } else {
            throw new Error('No token received');
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);
          return throwError(() => error);
        })
      );
  }
}
