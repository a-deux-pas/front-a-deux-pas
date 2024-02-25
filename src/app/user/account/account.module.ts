import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { InformationComponent } from './profile/information/information.component';
import { ScheduleComponent } from './profile/schedule/schedule.component';
import { MeetingPlacesComponent } from './profile/meeting-places/meeting-places.component';


@NgModule({
  declarations: [
    ProfileComponent,
    InformationComponent,
    ScheduleComponent,
    MeetingPlacesComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
