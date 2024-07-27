import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAdComponent } from './my-ad.component';

const myAdRoutes: Routes = [
  { path: '', component: MyAdComponent },
  {
    path: 'modification',
    loadComponent: () => import('./update-my-ad/update-my-ad.component').then(mod => mod.UpdateMyAdComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(myAdRoutes)],
  exports: [RouterModule]
})
export class MyAdRoutingModule { }
