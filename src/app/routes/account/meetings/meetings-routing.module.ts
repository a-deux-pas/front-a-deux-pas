import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsComponent } from './meetings.component';

const meetingsRoutes: Routes = [
  { path: '', component: MeetingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(meetingsRoutes)],
  exports: [RouterModule]
})
export class MeetingsRoutingModule { }
