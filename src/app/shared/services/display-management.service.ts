import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { Alert } from '../models/alert.model';

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
  // ReplaySubject that will emit Alert type values
  private alertRequest = new ReplaySubject<Alert>();
  // Create an observable from the ReplaySubject
  alertRequest$ = this.alertRequest.asObservable();

  constructor() {
    this.checkWindowSize();
    window.addEventListener('resize', () => this.checkWindowSize());
  }

  private checkWindowSize(): void {
    this.isBigScreenSubject.next(window.innerWidth > 1200);
  }

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

  // Method to trigger the alert. It sends an alert to the alertRequest ReplaySubject,
  // which in turn notifies all subscribers.
  displayAlert(alert: Alert) {
    this.alertRequest.next(alert);
  }
}
