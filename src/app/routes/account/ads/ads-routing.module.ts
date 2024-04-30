import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads.component';

const routes: Routes = [
  { path: '', component: AdsComponent },
  {
    path: 'mon-annonce',
    children: [
      {
        path: ':id',
        loadComponent: () => import('./my-ad/my-ad.component').then(mod => mod.MyAdComponent)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
