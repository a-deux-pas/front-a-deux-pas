import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingPlacesComponent } from './profile/meeting-places/meeting-places.component';
import { InformationComponent } from './profile/information/information.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './profile/schedule/schedule.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    InformationComponent,
    ScheduleComponent,
    MeetingPlacesComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FullCalendarModule,
  ],
  exports: [
    AccountComponent,
  ]
})
export class AccountModule { }
