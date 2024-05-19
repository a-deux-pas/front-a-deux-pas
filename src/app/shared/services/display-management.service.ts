import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

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
}
