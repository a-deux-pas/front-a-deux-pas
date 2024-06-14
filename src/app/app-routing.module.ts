import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { provideRouter, withDebugTracing } from '@angular/router';

const routes: Routes = [
  {
    path: 'accueil',
    loadComponent: () =>
      import('./routes/home/logged-in-home/logged-in-home.component').then(
        (mod) => mod.LoggedInHomeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'annonce',
    loadChildren: () =>
      import('./routes/ad/ad-routing.module').then(
        (mod) => mod.AdRoutingModule
      ),
  },
  {
    path: 'compte',
    loadChildren: () =>
      import('./routes/account/account-routing.module').then(
        (mod) => mod.AccountRoutingModule
      ),
    canActivate: [authGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./routes/home/default-home/default-home.component').then(
        (mod) => mod.DefaultHomeComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
