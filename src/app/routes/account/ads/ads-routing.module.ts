import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads.component';

const adsRoutes: Routes = [
  { path: '', component: AdsComponent },
  {
    path: 'mon-annonce/:adId',
    loadChildren: () => import('./my-ad/my-ad-routing.module').then(mod => mod.MyAdRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(adsRoutes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
