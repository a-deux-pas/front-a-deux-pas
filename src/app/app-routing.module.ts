import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
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
      )
  },
  {
    path: 'inscription',
    loadComponent: () =>
      import('./routes/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'profil/:sellerAlias',
    loadComponent: () =>
      import('./routes/seller-profile/seller-profile.component' ).then(
        (mod) => mod.SellerProfileComponent
      ),
    canActivate: [AuthGuard]
  }
];

const routerOptions: ExtraOptions = {
  // Restore scroll position to the top of the page
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
