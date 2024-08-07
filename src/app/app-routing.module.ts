import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routes/home/home.component').then((mod) => mod.HomeComponent),
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
    path: 'commander',
    loadChildren: () =>
      import('./routes/checkout/checkout-routing.module').then(
        (mod) => mod.CheckoutRoutingModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'inscription',
    loadComponent: () =>
      import('./routes/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profil/:sellerAlias',
    loadComponent: () =>
      import('./routes/seller-profile/seller-profile.component').then(
        (mod) => mod.SellerProfileComponent
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
