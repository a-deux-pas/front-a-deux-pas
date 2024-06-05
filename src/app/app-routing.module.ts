import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'accueil',
    loadComponent: () => import('./routes/home/logged-in-home/logged-in-home.component').then(mod => mod.LoggedInHomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'annonce',
    loadChildren: () => import('./routes/ad/ad-routing.module').then(mod => mod.AdRoutingModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./routes/account/account-routing.module').then(mod => mod.AccountRoutingModule)
    // TO Do: activate authGauard with test e2e
    // canActivate: [authGuard],
  },
  {
    path: 'inscription',
    loadComponent: () => import('./routes/register/register.component').then(mod => mod.RegisterComponent)
  },
  {
    path: '',
    loadComponent: () => import('./routes/home/default-home/default-home.component').then(mod => mod.DefaultHomeComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
