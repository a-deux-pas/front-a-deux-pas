import { NgModule } from '@angular/core';
import { AdFormComponent } from './ad-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'add-form', component: AdFormComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdModule { }
