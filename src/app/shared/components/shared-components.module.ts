import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { TabsAccountComponent } from './tabs-account/tabs-account.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AdFormComponent } from '../components/ads/ad-form/ad-form.component';
import { UserPresentationComponent } from './user-presentation/user-presentation.component';


@NgModule({
  declarations: [
    TabsAccountComponent,
    ScheduleComponent,
    UserPresentationComponent,
    AdFormComponent,
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbCarouselModule,
    RouterModule,
    FullCalendarModule,
    NgxDropzoneModule,
    FormsModule,
    NgSelectModule,
  ],
  exports: [
    TabsAccountComponent,
    ScheduleComponent,
    UserPresentationComponent,
    AdFormComponent
  ]
})
export class SharedComponentsModule { }
