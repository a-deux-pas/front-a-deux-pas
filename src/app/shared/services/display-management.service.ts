import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
/**
 * Service for managing display-related functionality such as screen size detection
 * and configuration of Mapbox address autofill components.
 */
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

    // Mapbox Address autofill configuration
    public configureAddressAutofill(): void {
      // Find all mapbox-address-autofill elements and configure them
      const elements = document.querySelectorAll('mapbox-address-autofill');
      const elementsArray = Array.from(elements);
      elementsArray.forEach((autofill: any) => {
        // Set accessToken for each mapbox-address-autofill element
        autofill.accessToken = environment.mapboxToken;
      });
    }
  }
