import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routes/home/home.component').then(
        (mod) => mod.HomeComponent
      )
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
    // TO Do: activate authGauard with test e2e
    canActivate: [AuthGuard],
  },
  {
    path: 'inscription',
    loadComponent: () => import('./routes/register/register.component').then(
        (mod) => mod.RegisterComponent
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
