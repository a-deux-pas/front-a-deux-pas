import { NgModule } from '@angular/core';
import { CreateAdComponent } from './create-ad.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CreateAdComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CreateAdRoutingModule { }
