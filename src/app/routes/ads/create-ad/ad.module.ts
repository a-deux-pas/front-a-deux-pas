import { NgModule } from '@angular/core';
import { AdFormComponent } from './ad-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToCheckComponent } from '../to-check/to-check.component';
const routes: Routes = [
  { path: 'add-form', component: AdFormComponent },
  { path: 'tocheck', component: ToCheckComponent }
]

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdModule { }
