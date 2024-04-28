import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads.component';

const routes: Routes = [
  {
    path: 'mon-annonce',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./my-ad/my-ad.module').then(m => m.MyAdModule)
      }
    ]
  },
  { path: '', component: AdsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
