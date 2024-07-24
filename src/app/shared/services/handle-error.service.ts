import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class HandleErrorService {
  // Handle Http operation that failed
  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('A client-side or network error occurred');
    }
    const errorMessage = error.error;
    console.error('Error details:', errorMessage);
    return throwError(() => errorMessage);
  }
}
