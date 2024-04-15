import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedInHomeRoutingModule } from './logged-in-home-routing.module';
import { LoggedInHomeComponent } from './logged-in-home.component';


@NgModule({
  declarations: [
    LoggedInHomeComponent
  ],
  imports: [
    CommonModule,
    LoggedInHomeRoutingModule
  ],
  exports: [
    LoggedInHomeComponent,
  ]
})
export class LoggedInHomeModule { }
