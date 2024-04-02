import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MeetingPlacesComponent } from './components/meeting-places/meeting-places.component';

import { ProfileComponent } from './profile.component';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { EditButtonComponent } from './components/edit-button/edit-button.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MeetingPlacesComponent,
    EditButtonComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedComponentsModule
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
