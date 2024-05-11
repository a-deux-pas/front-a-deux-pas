import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    isBigScreen: boolean | undefined;

    // This subscription listens for window resize events
    // When a resize event occurs, the onResize method is triggered
    // It takes the event object as a parameter
    // The isBigScreen property is updated based on the inner width of the event target
    private isBigScreenSubject = new BehaviorSubject<boolean>(false);
    isBigScreen$ = this.isBigScreenSubject.asObservable();

    constructor() {
        this.checkWindowSize();
        window.addEventListener('resize', () => this.checkWindowSize());
    }

    private checkWindowSize(): void {
        this.isBigScreenSubject.next(window.innerWidth > 1200);
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
