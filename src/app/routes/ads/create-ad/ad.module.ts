import { NgModule } from '@angular/core';
import { AdFormComponent } from './ad-form.component';
import { TodeleteComponent } from '../todelete/todelete.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'add-form', component: AdFormComponent },
  { path: 'todelete', component: TodeleteComponent },
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
