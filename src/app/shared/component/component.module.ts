import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AdFormComponent } from './ads/ad-form/ad-form.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AdFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxDropzoneModule,
    NgSelectModule,
    NgbCarousel,
    NgbCarouselModule, FormsModule
  ],
  exports: [AdFormComponent]
})
export class ComponentModule { }