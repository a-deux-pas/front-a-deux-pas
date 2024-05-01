import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/home/default-home/default-home-routing.module').then(mod => mod.DefaultHomeRoutingModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('./routes/home/logged-in-home/logged-in-home-routing.module').then(mod => mod.LoggedInHomeRoutingModule)
  },
  {
    path: 'annonce',
    loadChildren: () => import('./routes/ad/ad-routing.module').then(mod => mod.AdRoutingModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./routes/account/account-routing.module').then(mod => mod.AccountRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
