import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsComponent } from './adds.component';

const routes: Routes = [
  { path: 'compte/annonces', component: AddsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddsRoutingModule { }
