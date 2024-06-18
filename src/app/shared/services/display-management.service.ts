import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.secrets';

@Injectable({
    providedIn: 'root'
})
export class DisplayManagementService {
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

    public configureAddressAutofill(): void {
      const elements = document.querySelectorAll('mapbox-address-autofill');
      const elementsArray = Array.from(elements);
      elementsArray.forEach((autofill: any) => {
        autofill.accessToken = environment.mapbox.accessToken;
      });
    }
  }
