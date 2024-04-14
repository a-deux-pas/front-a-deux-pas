import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAdComponent } from './my-ad.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: MyAdComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAdModule { }
