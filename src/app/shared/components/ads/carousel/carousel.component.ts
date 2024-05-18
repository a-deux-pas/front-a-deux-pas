// import { Component, ViewChild, Input } from '@angular/core';
// import { NgbCarousel, NgbCarouselModule, NgbNavModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-carousel',
//   standalone: true,
//   imports: [
//     NgbNavModule,
//     NgbCarouselModule,
//     CommonModule,
//   ],
//   templateUrl: './carousel.component.html',
//   styleUrl: './carousel.component.scss'
// })
// export class CarouselComponent {
//   @Input() articlePictures: (string | undefined)[] = [];

//   @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

//   paused = false;
//   unpauseOnArrow = false;
//   pauseOnIndicator = false;
//   pauseOnHover = true;
//   pauseOnFocus = true;

//   togglePaused() {
//     if (this.paused) {
//       this.carousel!.cycle();
//     } else {
//       this.carousel!.pause();
//     }
//     this.paused = !this.paused;
//   }

//   onSlide(slideEvent: NgbSlideEvent) {
//     if (
//       this.unpauseOnArrow &&
//       slideEvent.paused &&
//       (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
//     ) {
//       this.togglePaused();
//     }
//     if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
//       this.togglePaused();
//     }
//   }
// }
