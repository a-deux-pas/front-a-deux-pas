import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsComponent } from './meetings.component';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';


@NgModule({
  declarations: [
    MeetingsComponent
  ],
  imports: [
    CommonModule,
    MeetingsRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    MeetingsComponent,
  ],
})
export class MeetingsModule { }
