import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'annonce',
    loadChildren: () => import('./routes/ad/ad-routing.module').then(mod => mod.AdRoutingModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./routes/account/account-routing.module').then(mod => mod.AccountRoutingModule)
  },
  {
    path: '',
    loadComponent: () => import('./routes/home/default-home/default-home.component').then(mod => mod.DefaultHomeComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
