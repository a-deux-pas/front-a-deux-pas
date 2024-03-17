import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsAccountComponent } from './tabs-account/tabs-account.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { EditButtonComponent } from './edit-button/edit-button.component';


@NgModule({
  declarations: [
    TabsAccountComponent,
    ScheduleComponent,
    EditButtonComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    RouterModule,
    FullCalendarModule,
  ],
  exports: [
    TabsAccountComponent,
    ScheduleComponent,
    EditButtonComponent
  ]
})
export class SharedComponentsModule { }
