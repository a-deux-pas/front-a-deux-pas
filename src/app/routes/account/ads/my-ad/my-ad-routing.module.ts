import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAdComponent } from './my-ad.component';

const routes: Routes = [
  {
    path: '', component: MyAdComponent
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAdRoutingModule { }
