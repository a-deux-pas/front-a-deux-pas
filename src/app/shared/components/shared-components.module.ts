import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsAccountComponent } from './tabs-account/tabs-account.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { UserPresentationComponent } from './user-presentation/user-presentation.component';


@NgModule({
  declarations: [
    TabsAccountComponent,
    ScheduleComponent,
    UserPresentationComponent
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
    UserPresentationComponent
  ]
})
export class SharedComponentsModule { }
