import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads.component';

const adsRoutes: Routes = [
  { path: '', component: AdsComponent },
  {
    path: 'mon-annonce/:adId',
    loadComponent: () => import('./my-ad/my-ad.component').then(mod => mod.MyAdComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(adsRoutes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
