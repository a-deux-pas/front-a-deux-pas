import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
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

    // TO DO : checker si ca doit rester dans ce service
    // carousel display management
    @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

    paused = false;
    unpauseOnArrow = false;
    pauseOnIndicator = false;

    togglePaused() {
        if (this.paused) {
            this.carousel!.cycle();
        } else {
            this.carousel!.pause();
        }
        this.paused = !this.paused;
    }

    onSlide(slideEvent: NgbSlideEvent) {
        if (
            this.unpauseOnArrow &&
            slideEvent.paused &&
            (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
        ) {
            this.togglePaused();
        }
        if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
            this.togglePaused();
        }
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

