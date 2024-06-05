import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HandleErrorService {
    /**
    * Handle Http operation that failed.
    * Let the app continue.
    *
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    // public handleError<T>(operation = 'opération', result?: T) {
    //     return (error: any): Observable<T> => {

    //       console.error(`${operation} failed:`, error);

    //       console.log(result);
    //         // // Let the app keep running by returning an empty result.
    //         // return of(result as T);
    //         // Return an observable with a user-facing error message
    //         return of(error as T);
    //     };
    // }

    public handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
