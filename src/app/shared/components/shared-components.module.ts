import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsAccountComponent } from './tabs-account/tabs-account.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { UserPresentationComponent } from './user-presentation/user-presentation.component';
import { MynavbarComponent } from './mynavbar/mynavbar.component';
import { LoginModule } from '../../routes/login/login.module';
import { RegisterModule } from '../../routes/register/register.module';

@NgModule({
  declarations: [
    TabsAccountComponent,
    ScheduleComponent,
    UserPresentationComponent,
    MynavbarComponent,
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    RouterModule,
    FullCalendarModule,
    LoginModule,
    RegisterModule,
  ],
  exports: [
    TabsAccountComponent,
    ScheduleComponent,
    UserPresentationComponent,
    MynavbarComponent,
  ],
})
export class SharedComponentsModule {}
