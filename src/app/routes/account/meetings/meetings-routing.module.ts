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
      { path: '', redirectTo: 'proposes', pathMatch: 'full' },
      { path: 'proposes', component: ProposedComponent },
      { path: 'a-confirmer', component: ToConfirmComponent },
      { path: 'planifies', component: PlannedComponent },
      { path: 'a-finaliser', component: ToFinalizeComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(meetingsRoutes)],
  exports: [RouterModule]
})
export class MeetingsRoutingModule { }
