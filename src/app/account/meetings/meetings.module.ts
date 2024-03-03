import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { ComponentsModule } from '../../shared/components/components.module';
import { MeetingsComponent } from './meetings.component';


@NgModule({
  declarations: [
    MeetingsComponent
  ],
  imports: [
    CommonModule,
    MeetingsRoutingModule,
    ComponentsModule
  ],
  exports: [
    MeetingsComponent,
  ],
})
export class MeetingsModule { }
