import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsComponent } from './meetings.component';
import { ProposedComponent } from './proposed/proposed.component';
import { ToConfirmComponent } from './to-confirm/to-confirm.component';
import { PlannedComponent } from './planned/planned.component';
import { ToFinalizeComponent } from './to-finalize/to-finalize.component';

const meetingsRoutes: Routes = [
  { path: '', component: MeetingsComponent ,
    children: [
      { path: '', redirectTo: 'proposed', pathMatch: 'full' },
      { path: 'proposed', component: ProposedComponent },
      { path: 'to-confirm', component: ToConfirmComponent },
      { path: 'planned', component: PlannedComponent },
      { path: 'to-finalize', component: ToFinalizeComponent },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(meetingsRoutes)],
  exports: [RouterModule]
})
export class MeetingsRoutingModule { }
