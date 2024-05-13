import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
    public handleError<T>(operation = 'opération', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
