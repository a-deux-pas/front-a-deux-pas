import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { StyleGuideRoutingModule } from './style-guide/style-guide-routing.module';
import { ProfileRoutingModule } from './account/profile/profile-routing.module';
import { ProfileModule } from './account/profile/profile.module';
import { AppRoutingModule } from './app-routing.module';
import { AddsModule } from './account/adds/adds.module';
import { AddsRoutingModule } from './account/adds/adds-routing.module';
import { MeetingsModule } from './account/meetings/meetings.module';
import { MeetingsRoutingModule } from './account/meetings/meetings-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    StyleGuideComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    StyleGuideRoutingModule,
    ProfileModule,
    ProfileRoutingModule,
    AddsModule,
    AddsRoutingModule,
    MeetingsModule,
    MeetingsRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
