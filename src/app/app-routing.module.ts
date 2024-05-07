import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'homeconnecte',
    loadChildren: () =>
      import('./routes/home/logged-in-home/logged-in-home.module').then(
        (m) => m.LoggedInHomeModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'compte/profil',
    loadChildren: () =>
      import('./routes/account/profile/profile-routing.module').then(
        (mod) => mod.ProfileRoutingModule
      ),
  },
  {
    path: 'compte/annonces',
    loadChildren: () =>
      import('./routes/account/ads/ads-routing.module').then(
        (mod) => mod.AdsRoutingModule
      ),
  },
  {
    path: 'compte/rdv',
    loadChildren: () =>
      import('./routes/account/meetings/meetings-routing.module').then(
        (mod) => mod.MeetingsRoutingModule
      ),
  },
  {
    path: 'compte/favoris',
    loadChildren: () =>
      import('./routes/account/favorites/favorites-routing.module').then(
        (mod) => mod.FavoritesRoutingModule
      ),
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
