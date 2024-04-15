import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedInHomeRoutingModule } from './logged-in-home-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LoggedInHomeComponent } from './logged-in-home.component';


@NgModule({
  declarations: [
    HeaderComponent,
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
