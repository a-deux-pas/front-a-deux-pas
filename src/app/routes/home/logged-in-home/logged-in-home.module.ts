import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedInHomeComponent } from './logged-in-home.component';
import { LoggedInHomeRoutingModule } from './logged-in-home-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LoggedInHomeComponent],
  imports: [CommonModule, LoggedInHomeRoutingModule, NgbModule],
})
export class LoggedInHomeModule {}
