import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInHomeComponent } from './logged-in-home.component';

const routes: Routes = [{ path: '', component: LoggedInHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedInHomeRoutingModule {}
