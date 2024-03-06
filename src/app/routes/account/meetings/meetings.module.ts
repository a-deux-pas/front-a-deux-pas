import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsComponent } from './meetings.component';
import { ComponentsModule } from '../../../shared/components/components.module';


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
