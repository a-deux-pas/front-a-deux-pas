import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'accueil',
    loadComponent: () => import('./routes/home/logged-in-home/logged-in-home.component').then(mod => mod.LoggedInHomeComponent)
  },
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
  {
    path: 'upload',
    loadComponent: () => import('./shared/components/ads/ad-form/image/image.component').then(mod => mod.ImageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
