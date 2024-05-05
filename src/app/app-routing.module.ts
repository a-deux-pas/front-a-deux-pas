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
  // {
  //   path: 'connexion',
  //   loadChildren: () =>
  //     import('./routes/login/login.module').then((m) => m.LoginModule),
  // },
  // {
  //   path: 'inscription',
  //   loadChildren: () =>
  //     import('./routes/register/register.module').then((m) => m.RegisterModule),
  // },
  // {
  //   path: 'compte/profil',
  //   loadChildren: () =>
  //     import('./routes/account/profile/profile.module').then(
  //       (m) => m.ProfileModule
  //     ),
  // },
  // {
  //   path: 'compte/annonces',
  //   loadChildren: () =>
  //     import('./routes/account/ads/ads.module').then((m) => m.AdsModule),
  // },
  // {
  //   path: 'compte/rdv',
  //   loadChildren: () =>
  //     import('./routes/account/meetings/meetings.module').then(
  //       (m) => m.MeetingsModule
  //     ),
  // },
  // {
  //   path: 'compte/favoris',
  //   loadChildren: () =>
  //     import('./routes/account/favorites/favorites.module').then(
  //       (m) => m.FavoritesModule
  //     ),
  // },
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
