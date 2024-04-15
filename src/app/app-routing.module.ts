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
    path: 'login',
    loadChildren: () =>
      import('./routes/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'compte/profil',
    loadChildren: () =>
      import('./routes/account/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'compte/annonces',
    loadChildren: () =>
      import('./routes/account/ads/ads.module').then((m) => m.AdsModule),
  },
  {
    path: 'compte/rdv',
    loadChildren: () =>
      import('./routes/account/meetings/meetings.module').then(
        (m) => m.MeetingsModule
      ),
  },
  {
    path: 'compte/favoris',
    loadChildren: () =>
      import('./routes/account/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
