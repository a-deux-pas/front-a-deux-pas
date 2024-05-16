import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

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
  },
  {
    path: 'login',
    loadComponent: () =>
      import(
        './shared/components/connection-modal/connection-modal.component'
      ).then((mod) => mod.ConnectionModalComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import(
        './shared/components/connection-modal/connection-modal.component'
      ).then((mod) => mod.ConnectionModalComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
