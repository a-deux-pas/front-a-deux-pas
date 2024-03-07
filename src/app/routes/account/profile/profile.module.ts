import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { InformationComponent } from './components/information/information.component';
import { MeetingPlacesComponent } from './components/meeting-places/meeting-places.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ProfileComponent } from './profile.component';
import { ComponentsModule } from '../../../shared/components/components.module';


@NgModule({
  declarations: [
    ProfileComponent,
    InformationComponent,
    MeetingPlacesComponent,
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FullCalendarModule,
    ComponentsModule
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
