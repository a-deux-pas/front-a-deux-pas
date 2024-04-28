import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAdComponent } from './my-ad.component';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MyAdRoutingModule } from './my-ad-routing.module';

@NgModule({
  declarations: [
    MyAdComponent
  ],
  imports: [
    NgbNavModule,
    NgbCarouselModule,
    CommonModule,
    MyAdRoutingModule
  ],
  exports: [
    MyAdComponent
  ]
})
export class MyAdModule { }
