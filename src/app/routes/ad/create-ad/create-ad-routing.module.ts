import { NgModule } from '@angular/core';
import { CreateAdComponent } from './create-ad.component';
import { RouterModule, Routes } from '@angular/router';

const createAdRoute: Routes = [
  { path: '', component: CreateAdComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(createAdRoute),
  ],
  exports: [RouterModule]
})
export class CreateAdRoutingModule { }
