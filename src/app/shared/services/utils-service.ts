import { HostListener, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    isBigScreen: boolean | undefined;

    // This HostListener listens for window resize events
    // When a resize event occurs, the onResize method is triggered
    // It takes the event object as a parameter
    // The isBigScreen property is updated based on the inner width of the event target
    @HostListener('window:resize', ['$event'])
    onResize(): boolean {
        // If the inner width is greater than 1200 pixels, isBigScreen is set to true, otherwise false
        this.isBigScreen = window.innerWidth > 1200;
        return this.isBigScreen;
    }

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